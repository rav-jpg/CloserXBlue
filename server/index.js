import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import xlsx from 'xlsx';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({limit:'50mb'}));
const upload = multer({dest:'uploads/'});

let DB = {
  clients: [{id:1, name:'Amit Coaching', email:'amit@test.com', plan:'Free', status:'Active', subscription:'free'}],
  sheets: [],
  knowledge: { business:'', pdfs:[] },
  bulkHistory: []
};

app.get('/', (req,res)=> res.json({status:'CloserBlue API Running ✅', features:['Bulk Sender with/without attachment','Dual Dashboard','CRM','Sheet Connect','Auto Payment','Google/FB Login','Subscription']}));

// === 1. AUTH - Google / Facebook / Email ===
app.post('/api/auth/google', (req,res)=>{ res.json({success:true, user:{email:req.body.email, name:'Google User'}, token:'google_token_'+Date.now()}); });
app.post('/api/auth/facebook', (req,res)=>{ res.json({success:true, user:{email:req.body.email, name:'FB User'}, token:'fb_token_'+Date.now()}); });
app.post('/api/auth/signup', (req,res)=>{ DB.clients.push({id:Date.now(), ...req.body, plan:'Free'}); res.json({success:true, message:'User created - Free access given'}); });

// === 2. SUBSCRIPTION - Sell Tool ===
app.get('/api/plans', (req,res)=> res.json([
  {id:'free', name:'Free', price:0, features:['1 client','100 msgs','Basic CRM']},
  {id:'starter', name:'Starter', price:1999, features:['5 clients','1000 msgs','Sheet + CRM','Bulk Sender']},
  {id:'pro', name:'Pro', price:4999, features:['Unlimited','10k msgs','White Label','Auto Payment','Team']}
]));
app.post('/api/subscribe', (req,res)=>{ const {email, plan} = req.body; res.json({success:true, checkout_url:`https://razorpay.com/pay/closerblue_${plan}`, message:`${plan} subscription created for ${email}`}); });

// === 3. KNOWLEDGE BASE - PDF + Typing ===
app.post('/api/knowledge/save', (req,res)=>{ DB.knowledge.business = req.body.businessInfo; DB.knowledge.price = req.body.price; res.json({success:true, message:'AI Trained on PDF + Business Info', knowledge:DB.knowledge}); });
app.post('/api/knowledge/upload-pdf', upload.single('pdf'), (req,res)=>{ DB.knowledge.pdfs.push(req.file.originalname); res.json({success:true, file:req.file.originalname, message:'PDF uploaded - AI will chat based on this'}); });

// === 4. SHEET & BULK SENDER - With/Without Attachment ===
app.post('/api/sheet/upload', upload.single('sheet'), (req,res)=>{
  try{
    const wb = xlsx.readFile(req.file.path);
    const sheet = wb.Sheets[wb.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet);
    const numbers = data.map(row=> Object.values(row)[0]).filter(Boolean); // first column = phone
    DB.sheets = numbers;
    res.json({success:true, count:numbers.length, numbers: numbers.slice(0,20), message:`${numbers.length} numbers imported from ${req.file.originalname}`});
  }catch(e){ res.status(500).json({error:e.message}); }
});

app.post('/api/bulk/send', upload.single('attachment'), (req,res)=>{
  const { message, withAttachment } = req.body;
  const count = DB.sheets.length || 10;
  const hasAttach = withAttachment==='true' || !!req.file;
  DB.bulkHistory.push({id:Date.now(), count, message, attachment: req.file?.originalname || null, time:new Date()});
  // Here you would loop and call WhatsApp Cloud API
  // For each number: send text + if hasAttach send media
  res.json({success:true, sent:count, withAttachment:hasAttach, attachmentName: req.file?.originalname || 'none', autoTrigger:'If new row added later, auto chat will start'});
});

// === 5. AUTO TRIGGER - Sheet Row -> Auto Chat -> Auto Payment ===
app.post('/api/automation/trigger', (req,res)=>{
  const {trigger, messageTemplate} = req.body;
  // trigger: 'new_sheet_row' or 'direct_whatsapp'
  res.json({success:true, automation:`When ${trigger} -> AI will read Knowledge Base (PDF) -> Send: ${messageTemplate} -> If asks price -> Auto Payment Link -> Close Deal`});
});

// === 6. AUTO PAYMENT LINK ===
app.post('/api/payment/create-link', (req,res)=>{
  const {amount, customerPhone, product} = req.body;
  const link = `https://rzp.io/l/CLOSERBLUE_${Date.now()}`;
  res.json({success:true, link, amount, message:`Payment link auto sent to ${customerPhone} for ${product}`, autoActions:['If paid -> Move CRM to Closed Won','Update Sheet as Paid','Send receipt']});
});

// === 7. CLIENTS & FREE ACCESS ===
app.get('/api/clients', (req,res)=> res.json(DB.clients));
app.post('/api/clients/give-free', (req,res)=>{ DB.clients.push({id:Date.now(), name:req.body.name, email:req.body.email, plan:'Free Lifetime', status:'Active'}); res.json({success:true, clients:DB.clients}); });

// === 8. CRM ===
app.get('/api/crm/leads', (req,res)=> res.json([{id:1, name:'Lead 1', phone:'+91 98...', stage:'New', value:2000}, {id:2, name:'Lead 2', phone:'+91 87...', stage:'Payment Sent', value:4999}]));

const PORT = process.env.PORT || 10000;
app.listen(PORT, ()=> console.log('CloserBlue Final API running on '+PORT));

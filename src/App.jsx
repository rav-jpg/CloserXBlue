import { useState, useEffect } from 'react'

function Logo({size='normal', showText=true}){
  const big = size==='big'
  return (
    <div className="flex items-center gap-3 font-black tracking-tight">
      <div className={`${big?'w-16 h-16':'w-12 h-12'} rounded-[16px] bg-gradient-to-br from-[#0A66FF] via-[#7C3AED] to-[#06B6D4] flex items-center justify-center shadow-xl shadow-blue-500/30 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-white/30 to-transparent"></div>
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white/20 rounded-full blur-sm"></div>
        <span className={`${big?'text-[28px]':'text-[22px]'} text-white font-black relative z-10 tracking-tighter`}>C</span>
      </div>
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1 leading-none">
            <span className={`${big?'text-[30px]':'text-[24px]'} font-black tracking-tighter text-[#0F172A]`}>CLOSER</span>
            <span className={`${big?'text-[30px]':'text-[24px]'} font-black bg-gradient-to-r from-[#0A66FF] to-[#7C3AED] bg-clip-text text-transparent`}>BLUE</span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] bg-black text-white px-2 py-0.5 rounded-full font-black tracking-widest">AI • CRM • CHATBOT</span>
            <span className="text-[8px] text-gray-500 font-bold tracking-widest">24x7 WHATSAPP AI</span>
          </div>
        </div>
      )}
    </div>
  )
}

const SUPER_ADMIN_EMAILS = ['admin@closerblue.com','owner@closerblue.com','superadmin@closerblue.com']
const EXTRA_TEAM_COST = 999
const PLANS = {
  starter: { name:'Starter', monthly:999, yearly:Math.round(999*12*0.8), teamLimit:1, saveYearly: 999*12 - Math.round(999*12*0.8), gradient:'from-blue-500 to-cyan-500', features:['1 Team Member','500 AI Chats/month','Basic CRM','Sheet Auto Chat','WhatsApp Own API','Business PDF','1 Year No Login','Email Support'] },
  pro: { name:'Pro', monthly:2499, yearly:Math.round(2499*12*0.8), teamLimit:3, saveYearly: 2499*12 - Math.round(2499*12*0.8), gradient:'from-violet-500 to-purple-500', popular:true, features:['3 Team Members','5000 AI Chats/month','Advanced CRM','Sheet Bulk Message','Any AI - GPT/Claude/Gemini/Grok/DeepSeek','Negotiation PDF + Auto Payment Link','DB Tool Connect','Priority Support','6 Months / 1 Year No Login'] },
  enterprise: { name:'Enterprise', monthly:4999, yearly:Math.round(4999*12*0.8), teamLimit:6, saveYearly: 4999*12 - Math.round(4999*12*0.8), gradient:'from-orange-500 to-pink-500', features:['6 Team Members','Unlimited AI Chats','Full CRM + Tool User Data View','Sheet + Bulk + Auto Chat','All AI Models Shareable','Business + Negotiation PDF','Auto Payment Collect','MongoDB/MySQL/Postgres','White Label','24x7 Support'] }
}
const LANGS_LIST = [
  {code:'en',name:'English',native:'English'},{code:'hi',name:'Hindi',native:'हिंदी'},{code:'hinglish',name:'Hinglish',native:'Hinglish'},
  {code:'te',name:'Telugu',native:'తెలుగు'},{code:'mr',name:'Marathi',native:'मराठी'},{code:'ml',name:'Malayalam',native:'മലയാളം'},
  {code:'ta',name:'Tamil',native:'தமிழ்'},{code:'bn',name:'Bengali',native:'বাংলা'},{code:'gu',name:'Gujarati',native:'ગુજરાતી'},
  {code:'kn',name:'Kannada',native:'ಕನ್ನಡ'},{code:'pa',name:'Punjabi',native:'ਪੰਜਾਬੀ'},{code:'ur',name:'Urdu',native:'اردو'},
  {code:'es',name:'Spanish',native:'Español'},{code:'fr',name:'French',native:'Français'},{code:'de',name:'German',native:'Deutsch'},
  {code:'pt',name:'Portuguese',native:'Português'},{code:'ar',name:'Arabic',native:'العربية'},{code:'ru',name:'Russian',native:'Русский'},
  {code:'ja',name:'Japanese',native:'日本語'},{code:'zh',name:'Chinese',native:'中文'},{code:'ko',name:'Korean',native:'한국어'},
  {code:'it',name:'Italian',native:'Italiano'},{code:'nl',name:'Dutch',native:'Nederlands'},{code:'tr',name:'Turkish',native:'Türkçe'},{code:'vi',name:'Vietnamese',native:'Tiếng Việt'}
]

function getDeviceId(){ let id=localStorage.getItem('closerblue_device_id'); if(!id){ id='device_'+Math.random().toString(36).substring(2,15)+Date.now().toString(36); localStorage.setItem('closerblue_device_id',id)} return id }
function generatePrimaryNumber(i){ return `CB-${String(i).padStart(4,'0')}` }
function calcPrice(planKey,billing){ const p=PLANS[planKey]; if(!p) return 0; return billing==='yearly'?p.yearly:p.monthly }
function calcExpiry(billing){ return billing==='yearly'? new Date(Date.now()+365*24*60*60*1000).toLocaleDateString() : new Date(Date.now()+30*24*60*60*1000).toLocaleDateString() }

// --- BRANDING HEADER ---
function BrandingHero({userRole}){
  return (
    <div className="relative bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#0F172A] rounded-[32px] p-6 md:p-10 text-white overflow-hidden shadow-2xl border border-white/10">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-[#0A66FF]/20 via-[#7C3AED]/20 to-[#06B6D4]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-violet-500/10 to-blue-500/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/4"></div>
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/10 rounded-full px-4 py-1.5 text-[10px] font-black tracking-widest">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> CLOSERBLUE • 24x7 AI CHAT ON WHATSAPP • LIVE
            </div>
            <h1 className="mt-4 font-black text-[28px] md:text-[42px] leading-[0.9] tracking-tighter">
              24x7 Work With <br/>
              <span className="bg-gradient-to-r from-[#60A5FA] via-[#A78BFA] to-[#22D3EE] bg-clip-text text-transparent">AI Chat on WhatsApp</span><br/>
              With Your Customers
            </h1>
            <p className="mt-4 text-[13px] md:text-[15px] text-white/60 font-medium max-w-2xl leading-relaxed">
              <b className="text-white">CloserBlue</b> - AI • CRM • CHATBOT - Apka business kabhi sota nahi. Hamara AI aapke customers se WhatsApp par 24x7 baat karta hai, lead ko CRM me save karta hai, sheet se auto chat start karta hai, negotiation PDF bhejta hai aur auto payment link se payment collect kar leta hai. Gemini, ChatGPT, Claude, Grok, DeepSeek - Koi bhi AI connect karo.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <div className="bg-white text-black px-5 py-2.5 rounded-full text-[12px] font-black shadow-xl flex items-center gap-2">🚀 24x7 AI Active <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span></div>
              <div className="bg-white/10 backdrop-blur border border-white/10 px-5 py-2.5 rounded-full text-[12px] font-black">📊 CRM • 📊 Sheet Auto Chat • 🤖 Any AI • 💳 Auto Payment</div>
              <div className="bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 rounded-full text-[12px] font-black shadow-lg">WhatsApp + AI = Sales on Autopilot</div>
            </div>
          </div>
          <div className="md:w-[320px] flex flex-col gap-3">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[20px] p-5">
              <div className="text-[10px] font-black tracking-widest opacity-50">CLOSERBLUE BRANDING</div>
              <div className="mt-3"><Logo size="big" /></div>
              <div className="mt-4 grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-white/10 rounded-full px-3 py-2 text-center font-black">AI CHATBOT 🧠</div>
                <div className="bg-white/10 rounded-full px-3 py-2 text-center font-black">CRM 📊</div>
                <div className="bg-white/10 rounded-full px-3 py-2 text-center font-black">SHEET AUTO ⚡</div>
                <div className="bg-white/10 rounded-full px-3 py-2 text-center font-black">PAYMENT 💳</div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-[20px] p-4 text-white shadow-xl">
              <div className="text-[10px] font-black opacity-80">TODAY STATS</div>
              <div className="mt-1 flex justify-between"><span className="text-[12px] font-bold">Leads from Sheet</span><span className="font-black">+128</span></div>
              <div className="flex justify-between"><span className="text-[12px]">Auto Chat Started</span><span className="font-black">+94</span></div>
              <div className="flex justify-between"><span className="text-[12px]">Payment Collected</span><span className="font-black">₹24,999</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- SMALL BOX - CLICK TO BIG ---
function FeatureBox({icon,title,desc,stats,color, onClick, badge}){
  return (
    <button onClick={onClick} className={`text-left border-2 rounded-[20px] p-4 md:p-5 bg-white hover:shadow-xl hover:scale-[1.02] transition-all group w-full relative overflow-hidden`}>
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${color} opacity-10 rounded-full blur-xl group-hover:opacity-20 transition-opacity -translate-y-6 translate-x-6`}></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-[16px] shadow-lg`}>{icon}</div>
          {badge && <span className="bg-black text-white text-[8px] px-2 py-1 rounded-full font-black tracking-widest">{badge}</span>}
        </div>
        <div className="mt-3 font-black text-[14px] leading-tight">{title}</div>
        <div className="text-[11px] text-gray-500 mt-1 leading-snug line-clamp-2">{desc}</div>
        <div className="mt-3 flex items-center gap-2">
          <span className={`text-[10px] font-black px-2.5 py-1 rounded-full bg-gradient-to-r ${color} text-white shadow`}>{stats}</span>
          <span className="text-[10px] text-gray-400 font-bold group-hover:text-black">Tap to open →</span>
        </div>
      </div>
    </button>
  )
}

function Modal({children, onClose, title}){
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-start md:items-center justify-center p-2 md:p-6 overflow-auto">
      <div className="bg-[#f8f9ff] rounded-[24px] md:rounded-[32px] w-full max-w-[1100px] max-h-[95vh] overflow-auto shadow-2xl border border-white">
        <div className="sticky top-0 bg-white/90 backdrop-blur-xl border-b p-4 md:p-5 flex justify-between items-center z-10 rounded-t-[24px]">
          <div className="flex items-center gap-3"><Logo size="small" /><span className="font-black text-[16px]">{title}</span></div>
          <button onClick={onClose} className="bg-black text-white w-10 h-10 rounded-full font-black">✕</button>
        </div>
        <div className="p-4 md:p-6">{children}</div>
      </div>
    </div>
  )
}

// Reuse old sections but with mobile friendly wrapper
function APIConnectSection({userRole='super'}){
  const [apis,setApis]=useState(()=>{
    const saved = localStorage.getItem('closerblue_admin_apis');
    return saved ? JSON.parse(saved) : {whatsapp:'',gemini:'',openai:'',claude:'',grok:'',deepseek:'',razorpay:'',sheets:'',mongodb:'',mysql:'',postgres:'',selectedAI:'gemini'}
  })
  const [aiSharing,setAiSharing]=useState(()=>{
    const saved = localStorage.getItem('closerblue_ai_sharing');
    return saved ? JSON.parse(saved) : {allowAdminAI:true, allowOwnAI:true, defaultMode:'admin', selectedModel:'gemini'}
  })
  const [toolUserAI,setToolUserAI]=useState(()=>{
    const saved = localStorage.getItem('closerblue_tooluser_ai');
    return saved ? JSON.parse(saved) : {ownApis:{gemini:'',openai:'',claude:'',grok:'',deepseek:''}, useMode:'admin', selectedModel:'gemini'}
  })
  useEffect(()=>{ if(userRole==='super') localStorage.setItem('closerblue_admin_apis', JSON.stringify(apis)) },[apis])
  useEffect(()=>{ if(userRole==='super') localStorage.setItem('closerblue_ai_sharing', JSON.stringify(aiSharing)) },[aiSharing])
  useEffect(()=>{ if(userRole==='tool') localStorage.setItem('closerblue_tooluser_ai', JSON.stringify(toolUserAI)) },[toolUserAI])
  const adminApis = (()=>{ try{ return JSON.parse(localStorage.getItem('closerblue_admin_apis')||'{}') }catch(e){ return {} } })()
  const adminAiSharing = (()=>{ try{ return JSON.parse(localStorage.getItem('closerblue_ai_sharing')||'{}') }catch(e){ return {allowAdminAI:true, allowOwnAI:true, selectedModel:'gemini'} } })()
  const aiModels = [
    {key:'gemini', name:'Gemini', full:'Gemini AI (Google)', color:'from-blue-500 to-violet-500', placeholder:'Gemini API Key - AIza...', icon:'G'},
    {key:'openai', name:'ChatGPT', full:'ChatGPT / OpenAI', color:'from-gray-800 to-black', placeholder:'OpenAI Key - sk-...', icon:'C'},
    {key:'claude', name:'Claude', full:'Claude (Anthropic)', color:'from-orange-500 to-amber-500', placeholder:'Claude API Key - sk-ant-...', icon:'Cl'},
    {key:'grok', name:'Grok', full:'Grok (xAI)', color:'from-gray-900 to-gray-700', placeholder:'Grok API Key - xai-...', icon:'Gr'},
    {key:'deepseek', name:'DeepSeek', full:'DeepSeek AI', color:'from-blue-700 to-cyan-600', placeholder:'DeepSeek API Key - sk-...', icon:'Ds'},
  ]
  const apiList = [
    {key:'whatsapp', name:'WhatsApp Business API', desc:'Own only', color:'from-green-500 to-emerald-500', placeholder:'WhatsApp API Key'},
    {key:'razorpay', name:'Razorpay Payment API', desc:'Auto payment link', color:'from-blue-600 to-indigo-600', placeholder:'Razorpay Key'},
    {key:'sheets', name:'Google Sheets API', desc:'Sheet connect', color:'from-green-600 to-teal-600', placeholder:'Sheet URL'},
    {key:'mongodb', name:'MongoDB', desc:'Tool DB', color:'from-green-700 to-green-900', placeholder:'MongoDB URI'},
    {key:'mysql', name:'MySQL', desc:'Tool DB', color:'from-orange-600 to-red-600', placeholder:'MySQL URI'},
    {key:'postgres', name:'PostgreSQL', desc:'CRM DB', color:'from-blue-800 to-indigo-900', placeholder:'Postgres URI'},
  ]
  if(userRole==='super'){
    const selectedModelObj = aiModels.find(m=>m.key===apis.selectedAI)||aiModels[0]
    return (
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-violet-50 to-blue-50 border-2 border-violet-200 rounded-[24px] p-4 md:p-6">
          <h4 className="font-black text-[16px] md:text-[18px]">🤖 AI Model Selector - Koi Bhi AI - Gemini, ChatGPT, Claude, Grok, DeepSeek</h4>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4">
            {aiModels.map(model=>(
              <button key={model.key} onClick={()=>{ setApis({...apis, selectedAI: model.key}); setAiSharing({...aiSharing, selectedModel: model.key}) }} className={`border-2 rounded-2xl p-4 text-left ${apis.selectedAI===model.key?'border-violet-500 bg-white shadow-xl':'border-gray-200 bg-white/50'}`}>
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${model.color} flex items-center justify-center text-white font-black`}>{model.icon}</div>
                <div className="font-black text-[13px] mt-2">{model.name}</div>
                <div className="text-[10px] text-gray-500">{model.full}</div>
                {apis.selectedAI===model.key && <div className="mt-2 bg-violet-600 text-white text-[9px] px-2 py-1 rounded-full w-fit">✓ Selected</div>}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiModels.map(model=>(
            <div key={model.key} className={`border-2 rounded-2xl p-4 ${apis.selectedAI===model.key?'border-violet-400 bg-white shadow-xl':'border-gray-200 bg-white/70'}`}>
              <div className="font-black text-[13px]">{model.full} <span className="bg-emerald-500 text-white text-[8px] px-2 py-0.5 rounded-full">SHAREABLE</span></div>
              <input value={apis[model.key]||''} onChange={e=>setApis({...apis,[model.key]:e.target.value})} placeholder={model.placeholder} className="w-full mt-2 border rounded-full px-4 py-2.5 text-[11px]"/>
              <div className="mt-2 text-[10px] bg-blue-50 border border-blue-200 rounded-xl p-2">{apis.selectedAI===model.key?'Current AI - Tool user use kar sakta hai ✅':'Select to make current'}</div>
            </div>
          ))}
          {apiList.map(api=>(
            <div key={api.key} className="border rounded-2xl p-4 bg-white"><div className="font-black text-[13px]">{api.name} <span className="bg-gray-500 text-white text-[8px] px-2 py-0.5 rounded-full">OWN ONLY</span></div><input value={apis[api.key]||''} onChange={e=>setApis({...apis,[api.key]:e.target.value})} placeholder={api.placeholder} className="w-full mt-2 border rounded-full px-4 py-2.5 text-[11px]"/></div>
          ))}
        </div>
      </div>
    )
  }
  const selectedModelForTool = aiModels.find(m=>m.key===(adminApis.selectedAI||'gemini'))||aiModels[0]
  const toolSelectedModel = aiModels.find(m=>m.key===toolUserAI.selectedModel)||selectedModelForTool
  return (
    <div className="space-y-6">
      <div className="bg-white border rounded-2xl p-4"><h4 className="font-black text-[14px]">Admin AI: {selectedModelForTool.full} - Tool user use kar sakta hai ✅</h4></div>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {aiModels.map(model=>(
          <button key={model.key} onClick={()=>setToolUserAI({...toolUserAI, selectedModel: model.key})} className={`border-2 rounded-2xl p-3 ${toolUserAI.selectedModel===model.key?'border-violet-500 bg-white shadow-lg':'border-gray-200 bg-white/50'}`}><div className="font-black text-[11px]">{model.name}</div></button>
        ))}
      </div>
      <div className="border-2 border-violet-200 bg-violet-50 rounded-2xl p-5">
        <div className="font-black text-[14px]">{toolSelectedModel.full} - 2 Options</div>
        <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3"><div className="text-[11px] font-black">Option 1: Admin Ka {selectedModelForTool.name} Use Karo ✅</div><button onClick={()=>setToolUserAI({...toolUserAI, useMode:'admin'})} className={`w-full mt-2 py-2 rounded-full text-[11px] font-black ${toolUserAI.useMode==='admin'?'bg-emerald-600 text-white':'bg-white border'}`}>Use Admin {selectedModelForTool.name}</button></div>
        <div className="mt-3 bg-white border rounded-xl p-3"><div className="text-[11px] font-black">Option 2: Apna {toolSelectedModel.name} Connect Karo</div><input value={toolUserAI.ownApis[toolSelectedModel.key]||''} onChange={e=>setToolUserAI({...toolUserAI, ownApis:{...toolUserAI.ownApis, [toolSelectedModel.key]: e.target.value}})} placeholder={`Apna ${toolSelectedModel.full} Key`} className="w-full mt-2 border rounded-full px-4 py-2.5 text-[11px]"/><button onClick={()=>setToolUserAI({...toolUserAI, useMode:'own'})} className={`w-full mt-2 py-2 rounded-full text-[11px] font-black ${toolUserAI.useMode==='own'?'bg-black text-white':'bg-gray-100'}`}>Use Own {toolSelectedModel.name}</button></div>
      </div>
    </div>
  )
}

function CRMSection({userRole}){
  const [leads,setLeads]=useState([
    {id:1,name:'Amit Sharma',email:'amit@test.com',phone:'9876543210',status:'New',business:'Coaching',service:'Website',source:'Sheet Upload',primaryNo:'CB-0001',lastChat:'2 min ago',paymentStatus:'Pending'},
    {id:2,name:'Priya Singh',email:'priya@test.com',phone:'8765432109',status:'Contacted',business:'Boutique',service:'Chatbot',source:'Tool User Sheet',primaryNo:'CB-0002',lastChat:'1 hr ago',paymentStatus:'Paid ₹2499'},
    {id:3,name:'Rahul Verma',email:'rahul@test.com',phone:'9000012345',status:'Negotiation',business:'Gym',service:'CRM Setup',source:'Admin Sheet',primaryNo:'CB-0003',lastChat:'5 min ago',paymentStatus:'Negotiation PDF Sent'},
  ])
  const [filter,setFilter]=useState('All')
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-auto bg-gray-100 p-1.5 rounded-full w-fit">
        {['All','New','Contacted','Negotiation','Paid','Failed'].map(f=><button key={f} onClick={()=>setFilter(f)} className={`px-4 py-2 rounded-full text-[11px] font-black whitespace-nowrap ${filter===f?'bg-black text-white':'text-gray-600'}`}>{f}</button>)}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-4 text-white"><div className="text-[10px] font-black opacity-80">TOTAL LEADS</div><div className="text-[28px] font-black">{leads.length}</div></div>
        <div className="bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl p-4 text-white"><div className="text-[10px] font-black opacity-80">ACTIVE CHATS</div><div className="text-[28px] font-black">{leads.filter(l=>l.status!=='Paid').length}</div></div>
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-4 text-white"><div className="text-[10px] font-black opacity-80">PAID</div><div className="text-[28px] font-black">{leads.filter(l=>l.paymentStatus.includes('Paid')).length}</div></div>
        <div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-4 text-white"><div className="text-[10px] font-black opacity-80">NEGOTIATION</div><div className="text-[28px] font-black">{leads.filter(l=>l.status==='Negotiation').length}</div></div>
      </div>
      <div className="border rounded-2xl overflow-auto">
        <div className="min-w-[700px]">
          <div className="grid grid-cols-7 bg-gray-50 text-[10px] font-black p-3"><span>PRIMARY</span><span>LEAD</span><span>PHONE</span><span>BUSINESS</span><span>SOURCE</span><span>STATUS</span><span>PAYMENT</span></div>
          {leads.filter(l=>filter==='All'||l.status===filter).map(lead=>(
            <div key={lead.id} className="grid grid-cols-7 text-[11px] p-3 border-t"><span className="font-black bg-yellow-200 px-2 py-1 rounded-full w-fit">{lead.primaryNo}</span><span className="font-bold">{lead.name}</span><span>{lead.phone}</span><span>{lead.business}</span><span>{lead.source}</span><span className="bg-black text-white px-2 py-1 rounded-full w-fit text-[10px]">{lead.status}</span><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full w-fit text-[10px]">{lead.paymentStatus}</span></div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SheetAutoChatSection({userRole}){
  const [sheetUrl,setSheetUrl]=useState('')
  const [sheetData,setSheetData]=useState([
    {name:'Amit',phone:'9876543210',business:'Gym',service:'Website',status:'Chat Started ✅'},
    {name:'Priya',phone:'8765432109',business:'Boutique',service:'Chatbot',status:'Bulk Sent ✅'},
  ])
  return (
    <div className="space-y-4">
      <div className="bg-gray-50 border-2 border-dashed rounded-2xl p-6 text-center">
        <div className="font-black text-[14px]">{userRole==='super'?'Admin Sheet Upload - Sabhi Par Chat Start':'Tool User Sheet Connect - Ek Sath Message Start'}</div>
        <input value={sheetUrl} onChange={e=>setSheetUrl(e.target.value)} placeholder="Google Sheet URL - https://..." className="w-full mt-3 border rounded-full px-6 py-3 text-[12px]"/>
        <button onClick={()=>{ if(!sheetUrl){alert('Sheet URL'); return} setSheetData(prev=>[...prev,{name:'New Lead',phone:'9'+Math.floor(Math.random()*1000000000),business:'Business',service:'Service',status:'Chat Started ✅'}]); alert(`✅ Sheet Connected: ${sheetUrl.substring(0,20)}...`)}} className="mt-3 bg-black text-white px-6 py-3 rounded-full font-black text-[12px] w-full md:w-auto">Connect Sheet + Start Message 🚀</button>
      </div>
      <div className="border rounded-2xl overflow-auto"><div className="min-w-[500px]"><div className="grid grid-cols-5 bg-gray-50 text-[10px] font-black p-3"><span>NAME</span><span>PHONE</span><span>BUSINESS</span><span>SERVICE</span><span>STATUS</span></div>{sheetData.map((r,i)=><div key={i} className="grid grid-cols-5 text-[11px] p-3 border-t"><span>{r.name}</span><span>{r.phone}</span><span>{r.business}</span><span>{r.service}</span><span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full w-fit text-[10px]">{r.status}</span></div>)}</div></div>
    </div>
  )
}

function SubscriptionSection({billing,setBilling, onBuy}){
  const [selectedPlan,setSelectedPlan]=useState('pro')
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-black text-[24px] md:text-[32px] tracking-tight">Choose Your <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">CloserBlue Plan</span></h2>
        <p className="text-[13px] text-gray-500 mt-2">Starter ₹999 (1 team) • Pro ₹2499 (3 team) • Enterprise ₹4999 (6 team) • Yearly 20% OFF • Extra team ₹999</p>
      </div>
      <div className="flex justify-center items-center gap-3 bg-white border shadow-sm p-2 rounded-full w-fit mx-auto">
        <span className={`text-[12px] font-black px-4 py-2 rounded-full ${billing==='monthly'?'bg-black text-white':'text-gray-500'}`}>Monthly</span>
        <button onClick={()=>setBilling(billing==='monthly'?'yearly':'monthly')} className={`w-12 h-7 rounded-full p-1 ${billing==='yearly'?'bg-gradient-to-r from-violet-600 to-blue-600':'bg-gray-200'}`}><div className={`w-5 h-5 bg-white rounded-full shadow transition-all ${billing==='yearly'?'translate-x-5':''}`}></div></button>
        <span className={`text-[12px] font-black px-4 py-2 rounded-full ${billing==='yearly'?'bg-gradient-to-r from-violet-600 to-blue-600 text-white':'text-gray-500'}`}>Yearly 20% OFF</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {Object.entries(PLANS).map(([key,plan])=>(
          <div key={key} className={`relative border-2 rounded-[24px] p-6 bg-white shadow-xl ${selectedPlan===key?'border-violet-500 ring-2 ring-violet-500/20':''} ${plan.popular?'ring-2 ring-violet-500 ring-offset-2':''}`}>
            {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-violet-600 to-blue-600 text-white text-[10px] font-black px-4 py-1.5 rounded-full">⭐ MOST POPULAR</div>}
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center shadow-lg mb-4`}><span className="text-white font-black">{plan.name[0]}</span></div>
            <div className="font-black text-[20px]">{plan.name}</div>
            <div className="mt-2 flex items-baseline gap-2"><span className="text-[30px] font-black">₹{billing==='yearly'?plan.yearly:plan.monthly}</span><span className="text-[12px] text-gray-500">/{billing==='yearly'?'year':'month'}</span></div>
            {billing==='yearly' && <div className="mt-2 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-full w-fit">Save ₹{plan.saveYearly} • 20% OFF</div>}
            <div className="mt-2 bg-black text-white px-3 py-1 rounded-full text-[11px] font-black w-fit">{plan.teamLimit} Team Members</div>
            <div className="mt-4 space-y-2">
              {plan.features.map((f,i)=><div key={i} className="flex gap-2 text-[11px]"><span className="text-emerald-500 font-black">✓</span><span className="text-gray-600">{f}</span></div>)}
            </div>
            <button onClick={()=>{ setSelectedPlan(key); onBuy && onBuy(key,billing) }} className={`mt-6 w-full py-3 rounded-full text-[13px] font-black ${selectedPlan===key?'bg-gradient-to-r from-violet-600 to-blue-600 text-white shadow-lg':'bg-black text-white'}`}>{selectedPlan===key?'✓ Selected - Buy Now 🚀':'Select '+plan.name+' →'}</button>
            <div className="mt-3 text-[10px] text-center text-gray-400">Extra team @ ₹999/member • 25 Languages • 1 Year / 6 Months No Login</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FeaturesSection(){
  const features = [
    {icon:'🤖', title:'Any AI Chatbot', desc:'Gemini, ChatGPT, Claude, Grok, DeepSeek - Koi bhi AI connect karo - Admin share ya own', color:'from-violet-500 to-purple-500'},
    {icon:'📊', title:'CRM - Tool User Data Kaha Dekhunga', desc:'Tool user ka data admin yaha dekhega - Primary No, Lead Name, Phone, Business, Source, Status, Payment', color:'from-blue-500 to-cyan-500'},
    {icon:'📊', title:'Sheet Auto Chat - Data Aate Hi Chat Start', desc:'Google Sheet connect karte hi sheet data number par ek sath message start - Bulk message - WhatsApp API', color:'from-emerald-500 to-teal-500'},
    {icon:'💾', title:'Database Tool Connect', desc:'User data tool ke database (MongoDB/MySQL/Postgres) me aa jaye - Sheet data -> Tool DB -> CRM -> Auto Chat', color:'from-green-700 to-green-900'},
    {icon:'📄', title:'Business PDF', desc:'Business ke liye PDF/Type se bata sake ki business ke bare me or kya service hai - Customer ko bhejo', color:'from-orange-500 to-amber-500'},
    {icon:'📄', title:'Negotiation PDF + Auto Payment Link', desc:'Negotiation PDF/Type se bata de ki ishe kam nahi ho payega fir auto payment link bhej ke payment collect kar le', color:'from-red-500 to-pink-500'},
    {icon:'💳', title:'Auto Payment Collect', desc:'Razorpay/UPI/Stripe se auto payment link generate - https://rzp.io/l/... - CRM me Paid mark', color:'from-blue-600 to-indigo-600'},
    {icon:'👥', title:'Team Management', desc:'Starter 1 team, Pro 3 team, Enterprise 6 team + Extra @ ₹999/member - Primary No CB-XXXX auto', color:'from-gray-800 to-black'},
    {icon:'🌐', title:'25 Languages', desc:'English, Hindi, Hinglish, Telugu, Marathi, Malayalam, Tamil, Bengali, Gujarati, Kannada, Punjabi, Urdu, Spanish, French, German...', color:'from-violet-600 to-blue-600'},
    {icon:'🔐', title:'1 Year / 6 Months No Login', desc:'Login duration 1 year / 6 months no login needed - Device ID security - Google/Facebook/Email login', color:'from-pink-500 to-rose-500'},
    {icon:'📱', title:'Mobile Friendly', desc:'Full responsive - Mobile, Tablet, Desktop - Dashboard front page par CloserBlue branding + headline subheadline', color:'from-cyan-500 to-blue-500'},
    {icon:'⚡', title:'24x7 AI Chat on WhatsApp', desc:'24*7 work with AI chat on WhatsApp with your customer - AI kabhi sota nahi - Lead ko turant reply', color:'from-emerald-600 to-green-600'},
  ]
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-black text-[22px] md:text-[28px]">CloserBlue Me Kya Kya Kar Sakte Hai? 🚀</h2>
        <p className="text-[13px] text-gray-500 mt-2 max-w-3xl mx-auto">Ye sab features is tool me hai - CRM, Sheet Auto Chat, Bulk Message, Any AI (Gemini, ChatGPT, Claude, Grok, DeepSeek), Database Tool Connect, Business PDF, Negotiation PDF + Auto Payment Link, Team, 25 Languages, 1 Year No Login, Mobile Friendly, 24x7 AI Chat on WhatsApp</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((f,i)=>(
          <div key={i} className="border rounded-[20px] p-5 bg-white shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center text-white text-[16px] shadow`}>{f.icon}</div>
            <div className="font-black text-[13px] mt-3">{f.title}</div>
            <div className="text-[11px] text-gray-600 mt-1 leading-relaxed">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsSection({lang,setLang}){
  return (
    <div className="space-y-6">
      <h3 className="font-black text-[18px]">⚙️ Settings - Jo Sara Add Karna Hai</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white border rounded-[20px] p-5 shadow-sm">
          <div className="font-black text-[13px]">🌐 Language - 25 Languages</div>
          <select value={lang} onChange={e=>setLang(e.target.value)} className="w-full mt-3 border rounded-full px-4 py-3 text-[13px] font-black">{LANGS_LIST.map(l=><option key={l.code} value={l.code}>{l.native} - {l.name}</option>)}</select>
          <div className="mt-3 text-[11px] text-gray-500">English → English tool, Telugu → తెలుగు, Marathi → मराठी, Malayalam → മലയാളം, German → Deutsch - Full translation</div>
        </div>
        <div className="bg-white border rounded-[20px] p-5 shadow-sm">
          <div className="font-black text-[13px]">🔐 Login Duration</div>
          <div className="mt-3 grid grid-cols-2 gap-2"><button className="border-2 border-black bg-black text-white py-3 rounded-full text-[11px] font-black">1 Year No Login 🔥</button><button className="border-2 border-gray-200 bg-white py-3 rounded-full text-[11px] font-black">6 Months No Login</button></div>
          <div className="mt-3 text-[11px] text-gray-500">Device ID security - 1 device per login - Google/Facebook/Email login - OTP</div>
        </div>
        <div className="bg-white border rounded-[20px] p-5 shadow-sm">
          <div className="font-black text-[13px]">🎨 Branding - CloserBlue</div>
          <div className="mt-3 flex items-center gap-3"><Logo size="big" /></div>
          <div className="mt-3 text-[11px] text-gray-500">Logo: Gradient C icon + CLOSER (26px black 900) + BLUE (gradient) + AI•CRM•CHATBOT badge - Headline 42px, Sub headline 16px, Text 13px</div>
        </div>
        <div className="bg-white border rounded-[20px] p-5 shadow-sm">
          <div className="font-black text-[13px]">💾 Database Tool Connect</div>
          <div className="mt-3 flex flex-wrap gap-2"><span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-black">MongoDB ✅</span><span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black">MySQL ✅</span><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black">PostgreSQL ✅</span><span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black">Sheet → DB → CRM</span></div>
          <div className="mt-3 text-[11px] text-gray-500">Database tool connect kar saku ki user data tool ke database me aa jaye - MongoDB/MySQL/Postgres</div>
        </div>
        <div className="bg-white border rounded-[20px] p-5 shadow-sm">
          <div className="font-black text-[13px]">🤖 AI Sharing - Any AI</div>
          <div className="mt-3 text-[11px] text-gray-600">Gemini ke jagah par koi bhi chatbot ke liye AI tool - ChatGPT, Claude, Grok, DeepSeek ya koi or connect kar sakte hai mai or tool user - Setting: AI tool user mera use kar sakta hai ya apna bhi connect karke apna use kar sakta hai - WhatsApp share nahi - Sirf AI shareable</div>
          <div className="mt-3 flex gap-2"><span className="bg-violet-100 text-violet-700 px-3 py-1 rounded-full text-[10px] font-black">Gemini ✅ Shareable</span><span className="bg-gray-800 text-white px-3 py-1 rounded-full text-[10px] font-black">ChatGPT ✅ Shareable</span><span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-[10px] font-black">Claude ✅</span><span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black">DeepSeek ✅</span></div>
        </div>
        <div className="bg-white border rounded-[20px] p-5 shadow-sm">
          <div className="font-black text-[13px]">📱 Mobile Friendly</div>
          <div className="mt-3 text-[11px] text-gray-600">Full responsive - Mobile, Tablet, Desktop - Dashboard front page par sabse upar CloserBlue ki branding or headline subheadline - 24*7 work with AI chat on WhatsApp with your customer</div>
          <div className="mt-3 bg-black text-white px-4 py-2 rounded-full text-[10px] font-black w-fit">Mobile • Tablet • Desktop ✅ Responsive</div>
        </div>
      </div>
    </div>
  )
}

function SuperAdmin({allUsers,setAllUsers,lang,setLang}){
  const [tab,setTab]=useState('dashboard')
  const [billing,setBilling]=useState('monthly')
  const [modal,setModal]=useState(null) // crm, sheet, apis, users, settings, subscription, features
  const [freeName,setFreeName]=useState(''); const [freeEmail,setFreeEmail]=useState(''); const [freePlan,setFreePlan]=useState('starter'); const [freeBilling,setFreeBilling]=useState('monthly')
  const giveFree=()=>{ if(!freeName||!freeEmail){alert('Name Email'); return} const plan=PLANS[freePlan]; setAllUsers(prev=>[...prev,{primaryNo:generatePrimaryNumber(prev.length+1),name:freeName,email:freeEmail,planKey:freePlan,planName:plan.name,planPrice:calcPrice(freePlan,freeBilling),billing:freeBilling,planTeamLimit:plan.teamLimit,expiry:calcExpiry(freeBilling),language:lang,loginDuration:'1year',date:new Date().toLocaleString(),givenBy:'Admin'}]); setFreeName(''); setFreeEmail(''); alert(`✅ ${freeName} ko ${plan.name} ₹${calcPrice(freePlan,freeBilling)}/${freeBilling} diya`)}

  return (
    <div className="space-y-6">
      <BrandingHero userRole="super" />

      {/* Small Boxes - Chhota chhota box me pehle rakha */}
      <div>
        <h3 className="font-black text-[16px] mb-3">📦 Quick Access - Chhota Box - Tap Kare To Bada Me Rahe</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <FeatureBox icon="📊" title="CRM - Tool User Data Kaha Dekhunga" desc="Tool user ka data mai kaha dekhunga - Yaha! Database tool connect - CRM me bada view" stats="3 Leads • Tap to expand" color="from-blue-500 to-cyan-500" badge="CRM" onClick={()=>setModal('crm')} />
          <FeatureBox icon="📊" title="Sheet + Auto Chat + DB Tool" desc="Sheet upload + sabhi par chat start - Sheet data aate hi chat start - DB connect" stats="2 Sheets • Bulk Message" color="from-emerald-500 to-teal-500" badge="SHEET" onClick={()=>setModal('sheet')} />
          <FeatureBox icon="🤖" title="AI APIs - Any AI - GPT/Claude/Gemini" desc="Gemini ke jagah koi bhi AI - ChatGPT, Claude, Grok, DeepSeek - Shareable - WhatsApp own only" stats="5 AI • Shareable" color="from-violet-500 to-purple-500" badge="AI" onClick={()=>setModal('apis')} />
          <FeatureBox icon="👥" title="Users + Plans + Team" desc="All users - Plan + Team + Login Duration + CRM + Chatbot Linked - CB-XXXX" stats={`${allUsers.length} Users`} color="from-orange-500 to-pink-500" badge="USERS" onClick={()=>setModal('users')} />
          <FeatureBox icon="⚙️" title="Settings - Sara Add Karna Hai" desc="Language 25, Login Duration, Branding, DB Tool Connect, AI Sharing, Mobile Friendly" stats="Settings • Branding" color="from-gray-700 to-black" badge="SETTINGS" onClick={()=>setModal('settings')} />
          <FeatureBox icon="💳" title="Subscription Plans - Buy Karne Ke Liye" desc="Starter 999 (1 team), Pro 2499 (3 team), Enterprise 4999 (6 team) - Yearly 20% OFF" stats="3 Plans • Buy Now" color="from-amber-500 to-orange-500" badge="SUBSCRIBE" onClick={()=>setModal('subscription')} />
          <FeatureBox icon="🚀" title="Features - Is Tool Me Kya Kya Kar Sakte Hai" desc="CRM, Sheet Auto Chat, Any AI, DB Connect, Business PDF, Negotiation PDF, Payment Link..." stats="12 Features • Explore" color="from-pink-500 to-rose-500" badge="FEATURES" onClick={()=>setModal('features')} />
          <FeatureBox icon="🎁" title="Give Free/Paid Access" desc="Give free/paid access + plan + team + login duration - CB-XXXX auto generate" stats="Give Access • Admin" color="from-cyan-500 to-blue-500" badge="FREE" onClick={()=>setModal('free')} />
        </div>
      </div>

      {/* Modals - CRM par tap kare to bada me rahe taki achhe se dekh sake */}
      {modal==='crm' && <Modal onClose={()=>setModal(null)} title="📊 CRM - Customer Relationship Management - Bada View - Tool User Data Yaha"><CRMSection userRole="super" /></Modal>}
      {modal==='sheet' && <Modal onClose={()=>setModal(null)} title="📊 Sheet + Auto Chat + DB Tool Connect - Bada View"><SheetAutoChatSection userRole="super" /></Modal>}
      {modal==='apis' && <Modal onClose={()=>setModal(null)} title="🤖 AI APIs - Any AI - Gemini, ChatGPT, Claude, Grok, DeepSeek - Bada View - Koi Bhi AI Connect Kar Sakte Hai Mai Or Tool User"><APIConnectSection userRole="super" /></Modal>}
      {modal==='users' && <Modal onClose={()=>setModal(null)} title="👥 All Users - Bada View">
        <div className="border rounded-2xl overflow-auto"><div className="min-w-[700px]"><div className="grid grid-cols-7 bg-gray-50 text-[10px] font-black p-3"><span>PRIMARY</span><span>NAME/PLAN</span><span>EMAIL</span><span>PRICE</span><span>TEAM</span><span>LOGIN</span><span>LANG</span></div>{allUsers.map((u,i)=><div key={i} className="grid grid-cols-7 text-[11px] p-3 border-t"><span className="font-black bg-yellow-200 px-2 py-1 rounded-full w-fit">{u.primaryNo}</span><span><b>{u.name}</b><br/><span className="bg-black text-white px-2 py-0.5 rounded-full text-[9px]">{u.planName} ₹{u.planPrice}</span></span><span className="text-[10px]">{u.email}</span><span>₹{u.planPrice}/{u.billing}</span><span>{u.planTeamLimit} team</span><span>{u.loginDuration}</span><span>{u.language}</span></div>)}</div></div>
      </Modal>}
      {modal==='settings' && <Modal onClose={()=>setModal(null)} title="⚙️ Settings - Jo Sara Add Karna Hai - Branding, CRM Kaha Rahega, Function Kaha Rahega"><SettingsSection lang={lang} setLang={setLang} /></Modal>}
      {modal==='subscription' && <Modal onClose={()=>setModal(null)} title="💳 Subscription Buy Karne Ke Liye - Kon Sa Plan Me Kya Milega"><SubscriptionSection billing={billing} setBilling={setBilling} onBuy={(k,b)=>{ alert(`✅ ${PLANS[k].name} ₹${calcPrice(k,b)}/${b} Buy Kiya - Payment Page Par Jao`); setModal(null) }} /></Modal>}
      {modal==='features' && <Modal onClose={()=>setModal(null)} title="🚀 Features - Is Tool Me Kya Kya Kar Sakte Hai"><FeaturesSection /></Modal>}
      {modal==='free' && <Modal onClose={()=>setModal(null)} title="🎁 Give Free/Paid Access"><div className="grid grid-cols-1 md:grid-cols-2 gap-4"><input value={freeName} onChange={e=>setFreeName(e.target.value)} placeholder="Name" className="border rounded-full px-6 py-4 text-[14px]"/><input value={freeEmail} onChange={e=>setFreeEmail(e.target.value)} placeholder="Email" className="border rounded-full px-6 py-4 text-[14px]"/><select value={freePlan} onChange={e=>setFreePlan(e.target.value)} className="border rounded-full px-6 py-4 text-[14px] font-black"><option value="starter">Starter ₹999 - 1 team</option><option value="pro">Pro ₹2499 - 3 team</option><option value="enterprise">Enterprise ₹4999 - 6 team</option></select><select value={freeBilling} onChange={e=>setFreeBilling(e.target.value)} className="border rounded-full px-6 py-4 text-[14px] font-black"><option value="monthly">Monthly</option><option value="yearly">Yearly 20% OFF</option></select></div><button onClick={giveFree} className="mt-4 bg-gradient-to-r from-violet-600 to-blue-600 text-white px-8 py-4 rounded-full font-black w-full md:w-auto">Give Access - {PLANS[freePlan].name} ₹{calcPrice(freePlan,freeBilling)}/{freeBilling} 🚀</button></Modal>}

      {/* Subscription Buy Button + Plans - Jab sara feat ho jaye to oske nichhe */}
      <div className="bg-white rounded-[28px] border shadow-xl p-6 md:p-8">
        <SubscriptionSection billing={billing} setBilling={setBilling} onBuy={(k,b)=>alert(`✅ ${PLANS[k].name} Buy - ₹${calcPrice(k,b)}/${b}`)} />
      </div>

      {/* Features - Ye sab bata na ki ya kya feature hai ishh tool me kya kya kar sakte hai */}
      <div className="bg-white rounded-[28px] border shadow-xl p-6 md:p-8">
        <FeaturesSection />
      </div>
    </div>
  )
}

function ToolUser({user,lang,setLang}){
  const [team,setTeam]=useState([])
  const [billing,setBilling]=useState(user.billing||'monthly')
  const [modal,setModal]=useState(null)
  const teamLimit = PLANS[user.planKey]?.teamLimit || user.planTeamLimit || 1
  const extraNeeded = Math.max(0, team.length - teamLimit)

  return (
    <div className="space-y-6">
      <BrandingHero userRole="tool" />

      <div className="bg-white/90 backdrop-blur-xl border rounded-2xl p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3 shadow-lg">
        <div className="flex items-center gap-3"><Logo size="small"/><div><div className="font-black text-[14px]">Tool User - {user.name} • {user.primaryNo} • {user.planName} ₹{user.planPrice}/{user.billing} • Team {team.length}/{teamLimit}</div><div className="text-[11px] text-gray-500">Mobile Friendly • 24x7 AI Chat on WhatsApp • {user.loginDuration} No Login</div></div></div>
        <select value={lang} onChange={e=>setLang(e.target.value)} className="border rounded-full px-4 py-2 text-[12px] font-black bg-white w-full md:w-auto"><option value={lang}>{LANGS_LIST.find(l=>l.code===lang)?.native} - {lang}</option>{LANGS_LIST.map(l=><option key={l.code} value={l.code}>{l.native}</option>)}</select>
      </div>

      <div>
        <h3 className="font-black text-[16px] mb-3">📦 Quick Access - Chhota Box - Tap Kare To Bada View</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <FeatureBox icon="📊" title="CRM - Mera Data" desc="Tool user ka data mai kaha dekhunga - Mera CRM - Bada view me achhe se dekho" stats="3 Leads • Tap to expand" color="from-blue-500 to-cyan-500" badge="CRM" onClick={()=>setModal('crm')} />
          <FeatureBox icon="📊" title="Sheet Connect + Bulk Message" desc="Sheet connect + sheet data number par ek sath message start - Auto chat" stats="Bulk Message • Auto" color="from-emerald-500 to-teal-500" badge="SHEET" onClick={()=>setModal('sheet')} />
          <FeatureBox icon="🤖" title="AI - Any AI - GPT/Claude/Gemini" desc="Koi bhi AI - ChatGPT ya koi or connect kar sakte hai - Admin ka ya apna" stats="Any AI • Shareable" color="from-violet-500 to-purple-500" badge="AI" onClick={()=>setModal('apis')} />
          <FeatureBox icon="👥" title={`Team ${team.length}/${teamLimit}`} desc={`Team management - ${teamLimit} included + Extra ₹${EXTRA_TEAM_COST} - Primary No CB-XXXX`} stats={`${teamLimit} Included`} color="from-orange-500 to-pink-500" badge="TEAM" onClick={()=>setModal('team')} />
          <FeatureBox icon="⚙️" title="Settings - Branding + Language" desc="Settings - Jo sara add karna hai - Branding, Language 25, Login Duration" stats="Settings" color="from-gray-700 to-black" badge="SETTINGS" onClick={()=>setModal('settings')} />
          <FeatureBox icon="💳" title="Subscription - Buy Karne Ke Liye" desc="Starter 999, Pro 2499, Enterprise 4999 - Kon sa plan me kya milega" stats="Buy Plan" color="from-amber-500 to-orange-500" badge="BUY" onClick={()=>setModal('subscription')} />
          <FeatureBox icon="🚀" title="Features - Kya Kar Sakte Hai" desc="Is tool me kya kya kar sakte hai - CRM, Sheet, AI, Payment, PDF..." stats="Features" color="from-pink-500 to-rose-500" badge="FEATURES" onClick={()=>setModal('features')} />
          <FeatureBox icon="📄" title="Business + Negotiation PDF" desc="Business PDF + Negotiation PDF + Auto Payment Link - CRM me bada view" stats="PDF + Payment" color="from-cyan-500 to-blue-500" badge="PDF" onClick={()=>setModal('crm')} />
        </div>
      </div>

      {modal==='crm' && <Modal onClose={()=>setModal(null)} title="📊 CRM - Mera Data - Bada View - Achhe Se Dekh Sake"><CRMSection userRole="tool" /></Modal>}
      {modal==='sheet' && <Modal onClose={()=>setModal(null)} title="📊 Sheet Connect + Bulk Message - Bada View"><SheetAutoChatSection userRole="tool" /></Modal>}
      {modal==='apis' && <Modal onClose={()=>setModal(null)} title="🤖 AI - Any AI - ChatGPT, Claude, Gemini, Grok, DeepSeek - Bada View"><APIConnectSection userRole="tool" /></Modal>}
      {modal==='team' && <Modal onClose={()=>setModal(null)} title="👥 Team Management">
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4"><div className="bg-gray-50 rounded-2xl p-5"><div className="text-[11px] font-black text-gray-500">TEAM LIMIT</div><div className="text-[28px] font-black">{teamLimit}</div></div><div className="bg-gray-50 rounded-2xl p-5"><div className="text-[11px] font-black text-gray-500">USED</div><div className="text-[28px] font-black">{team.length}</div></div><div className="bg-gradient-to-br from-orange-500 to-pink-500 rounded-2xl p-5 text-white"><div className="text-[11px] font-black">EXTRA COST</div><div className="text-[28px] font-black">₹{extraNeeded*EXTRA_TEAM_COST}</div></div></div>
          <div className="flex flex-col md:flex-row gap-3"><input id="tName" placeholder="Team Name" className="flex-1 border rounded-full px-6 py-3 text-[14px]"/><input id="tEmail" placeholder="Team Email" className="flex-1 border rounded-full px-6 py-3 text-[14px]"/></div>
          <button onClick={()=>{ const n=document.getElementById('tName').value||'Team'; const e=document.getElementById('tEmail').value||`team${team.length+1}@team.com`; if(team.length>=teamLimit){ if(!confirm(`Team limit ${teamLimit} full. Extra @₹${EXTRA_TEAM_COST} charge. Add?`)) return } setTeam(prev=>[...prev,{name:n,email:e,primaryNo:generatePrimaryNumber(100+prev.length+1),cost:team.length>=teamLimit?EXTRA_TEAM_COST:0}])}} className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-4 rounded-full font-black">+ Add Team - {team.length>=teamLimit?`Extra @₹${EXTRA_TEAM_COST}`:`Free within ${teamLimit}`}</button>
        </div>
      </Modal>}
      {modal==='settings' && <Modal onClose={()=>setModal(null)} title="⚙️ Settings"><SettingsSection lang={lang} setLang={setLang} /></Modal>}
      {modal==='subscription' && <Modal onClose={()=>setModal(null)} title="💳 Subscription Plans"><SubscriptionSection billing={billing} setBilling={setBilling} onBuy={(k,b)=>{ alert(`✅ ${PLANS[k].name} Buy - ₹${calcPrice(k,b)}/${b}`); setModal(null) }} /></Modal>}
      {modal==='features' && <Modal onClose={()=>setModal(null)} title="🚀 Features"><FeaturesSection /></Modal>}

      <div className="bg-white rounded-[28px] border shadow-xl p-6 md:p-8">
        <SubscriptionSection billing={billing} setBilling={setBilling} onBuy={(k,b)=>alert(`✅ ${PLANS[k].name} Buy - ₹${calcPrice(k,b)}/${b}`)} />
      </div>

      <div className="bg-white rounded-[28px] border shadow-xl p-6 md:p-8">
        <FeaturesSection />
      </div>
    </div>
  )
}

function AuthScreen({onLogin,onBackToAdmin,lang,setLang}){
  const [authType,setAuthType]=useState('email'); const [email,setEmail]=useState(''); const [mobile,setMobile]=useState(''); const [name,setName]=useState(''); const [businessName,setBusinessName]=useState(''); const [city,setCity]=useState(''); const [pass,setPass]=useState(''); const [otpSent,setOtpSent]=useState(false); const [otp,setOtp]=useState(''); const [selectedPlan,setSelectedPlan]=useState('pro'); const [billing,setBilling]=useState('monthly'); const [loginDuration,setLoginDuration]=useState('1year')
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f8ff] via-white to-[#f0f4ff] flex flex-col items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-xl border border-white/50 rounded-[32px] p-6 md:p-8 w-full max-w-[900px] shadow-2xl">
        <div className="flex justify-between items-center mb-6"><Logo size="big"/><select value={lang} onChange={e=>setLang(e.target.value)} className="border rounded-full px-4 py-2 text-[13px] font-black"><option>{LANGS_LIST.find(l=>l.code===lang)?.native}</option>{LANGS_LIST.map(l=><option key={l.code} value={l.code}>{l.native}</option>)}</select></div>
        <BrandingHero userRole="super" />
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" className="w-full border-2 border-gray-100 bg-gray-50 rounded-full px-6 py-4 text-[15px]"/>
            <input value={businessName} onChange={e=>setBusinessName(e.target.value)} placeholder="Business Name" className="w-full border-2 border-gray-100 bg-gray-50 rounded-full px-6 py-4 text-[15px]"/>
            <div className="flex gap-2 bg-gray-100 p-1.5 rounded-full w-fit"><button onClick={()=>setAuthType('email')} className={`px-5 py-2.5 rounded-full text-[13px] font-black ${authType==='email'?'bg-black text-white':'text-gray-500'}`}>📧 Email</button><button onClick={()=>setAuthType('mobile')} className={`px-5 py-2.5 rounded-full text-[13px] font-black ${authType==='mobile'?'bg-gradient-to-r from-violet-600 to-blue-600 text-white':'text-gray-500'}`}>📱 Mobile</button></div>
            {authType==='email'?<input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="w-full border-2 border-gray-100 rounded-full px-6 py-4 text-[15px]"/>:<div className="flex gap-3"><input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="Mobile +91..." className="flex-1 border-2 border-gray-100 rounded-full px-6 py-4 text-[15px]"/><button onClick={()=>{setOtpSent(true); alert('OTP 123456')}} className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-6 rounded-full text-[13px] font-black">OTP</button></div>}
            {authType==='mobile'&&otpSent&&<input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="OTP 123456" className="w-full border-2 border-gray-100 rounded-full px-6 py-4 text-[15px]"/>}
            <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder="Password" className="w-full border-2 border-gray-100 rounded-full px-6 py-4 text-[15px]"/>
            <div className="flex gap-2"><button onClick={()=>setLoginDuration('6months')} className={`flex-1 py-3 rounded-full text-[12px] font-black border-2 ${loginDuration==='6months'?'bg-black text-white border-black':'bg-white border-gray-200'}`}>6 Months No Login</button><button onClick={()=>setLoginDuration('1year')} className={`flex-1 py-3 rounded-full text-[12px] font-black border-2 ${loginDuration==='1year'?'bg-gradient-to-r from-violet-600 to-blue-600 text-white border-transparent':'bg-white border-gray-200'}`}>1 Year No Login 🔥</button></div>
            <button onClick={()=>{ const e=email||'user@gmail.com'; onLogin({email:e,name:name||'User',businessName:businessName||'Business',city:city||'India',language:lang,planKey:selectedPlan,planName:PLANS[selectedPlan].name,planPrice:calcPrice(selectedPlan,billing),billing,planTeamLimit:PLANS[selectedPlan].teamLimit,expiry:calcExpiry(billing),loginDuration,role:'tool'},true)}} className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-4 rounded-full font-black text-[15px] shadow-lg">Start 24x7 AI Chat on WhatsApp 🚀 - {PLANS[selectedPlan].name} ₹{calcPrice(selectedPlan,billing)}/{billing}</button>
            <button onClick={onBackToAdmin} className="w-full border-2 border-gray-100 py-3 rounded-full font-black text-[13px]">Back to Admin Login</button>
          </div>
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-[24px] p-6 text-white">
              <div className="font-black text-[16px]">🌐 25 Languages • 1 Year No Login • Mobile Friendly</div>
              <div className="mt-3 text-[11px] opacity-70 leading-relaxed">24x7 Work With AI Chat on WhatsApp With Your Customer - AI kabhi sota nahi. CloserBlue branding - Logo bada - Headline subheadline - CRM kaha rahega - Baki function kaha rahega - Chhota box me pehle rakha lekin CRM par tap kare to bada me rahe taki achhe se dekh sake.</div>
            </div>
            <div>
              <div className="font-black text-[14px] mb-3">Choose Plan - Kon sa plan me kya milega</div>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(PLANS).map(([key,plan])=>(
                  <button key={key} onClick={()=>setSelectedPlan(key)} className={`border-2 rounded-2xl p-4 text-left ${selectedPlan===key?'border-violet-500 bg-violet-50':'border-gray-100 bg-gray-50'}`}>
                    <div className="flex justify-between"><span className="font-black text-[14px]">{plan.name} ₹{billing==='yearly'?plan.yearly:plan.monthly}/{billing}</span><span className="text-[10px] bg-black text-white px-2 py-1 rounded-full">{plan.teamLimit} Team</span></div>
                    <div className="text-[11px] text-gray-500 mt-1">{plan.features.slice(0,3).join(' • ')}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  const [allUsers,setAllUsers]=useState([
    {primaryNo:'CB-0001',name:'Demo Starter',email:'demo@starter.com',planKey:'starter',planName:'Starter',planPrice:999,billing:'monthly',planTeamLimit:1,expiry:new Date(Date.now()+30*24*60*60*1000).toLocaleDateString(),city:'Lucknow',language:'hinglish',loginDuration:'1year'},
    {primaryNo:'CB-0002',name:'Priya Pro',email:'priya@pro.com',planKey:'pro',planName:'Pro',planPrice:23990,billing:'yearly',planTeamLimit:3,expiry:new Date(Date.now()+365*24*60*60*1000).toLocaleDateString(),city:'Delhi',language:'en',loginDuration:'6months'},
  ])
  const [showAuth,setShowAuth]=useState(false); const [lang,setLang]=useState('hinglish'); const [user,setUser]=useState(null)
  useEffect(()=>{
    const devId=getDeviceId();
    const savedUser=localStorage.getItem('closerblue_user'); const expiry=localStorage.getItem('closerblue_expiry');
    if(savedUser&&expiry&&Date.now()<parseInt(expiry)){ const parsed=JSON.parse(savedUser); const savedDev=localStorage.getItem('closerblue_user_device'); if(!savedDev||savedDev===devId||parsed.role==='super'){ setUser(parsed); setLang(parsed.language||'hinglish') } else { setUser({name:'Main Owner (You)',email:'owner@closerblue.com',role:'super',primaryNo:'CB-OWNER',planName:'Owner Lifetime',planPrice:0,planTeamLimit:100,expiry:'Lifetime'}) } }
    else { setUser({name:'Main Owner (You)',email:'owner@closerblue.com',role:'super',primaryNo:'CB-OWNER',planName:'Owner Lifetime',planPrice:0,planTeamLimit:100,expiry:'Lifetime'}) }
    const savedLang=localStorage.getItem('closerblue_lang'); if(savedLang) setLang(savedLang)
  },[])
  useEffect(()=>{ localStorage.setItem('closerblue_lang',lang) },[lang])
  const handleLogin=(u,isPersistent=true)=>{ const role=SUPER_ADMIN_EMAILS.includes(u.email.toLowerCase())||u.email.toLowerCase().includes('admin')?'super':'tool'; const durationDays = u.loginDuration==='6months'?180:365; const expiryTime=Date.now()+durationDays*24*60*60*1000; const idx=allUsers.length+1; const primaryNo=role==='super'?'CB-OWNER':generatePrimaryNumber(idx); const newUser={...u,role,primaryNo,deviceId:getDeviceId(),loginExpiry:new Date(expiryTime).toLocaleString(),loginExpiryTimestamp:expiryTime}; if(isPersistent){ localStorage.setItem('closerblue_user',JSON.stringify(newUser)); localStorage.setItem('closerblue_expiry',expiryTime.toString()); localStorage.setItem('closerblue_user_device',getDeviceId())} if(role==='tool'){ setAllUsers(prev=>prev.find(x=>x.email===newUser.email)?prev:[...prev,{...newUser,date:new Date().toLocaleString(),givenBy:'Self Signup'}])} setUser(newUser); setLang(newUser.language||lang); setShowAuth(false)}
  if(!user) return <div className="min-h-screen bg-gradient-to-br from-[#f6f8ff] to-white flex items-center justify-center p-4"><div className="bg-white rounded-full px-8 py-4 shadow-xl border flex items-center gap-3"><div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 animate-spin"></div><span className="font-black text-[12px] md:text-[14px]">Loading CloserBlue - 24x7 AI Chat on WhatsApp - Mobile Friendly...</span></div></div>
  if(showAuth) return <AuthScreen onLogin={handleLogin} onBackToAdmin={()=>setShowAuth(false)} lang={lang} setLang={setLang}/>
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f6f8ff] via-white to-[#f0f4ff] font-sans flex flex-col">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"><div className="absolute -top-20 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/10 to-violet-400/10 rounded-full blur-3xl"></div><div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-gradient-to-br from-violet-400/10 to-pink-400/10 rounded-full blur-3xl"></div></div>
      <div className="relative bg-white/90 backdrop-blur-xl border-b border-white/50 sticky top-0 z-20 shadow-sm"><div className="max-w-[1400px] mx-auto px-4 md:px-6 py-3 md:py-4 flex justify-between items-center"><Logo/><div className="flex gap-2 items-center"><select value={lang} onChange={e=>setLang(e.target.value)} className="border-2 border-gray-100 bg-white rounded-full px-3 md:px-4 py-2 md:py-2.5 text-[11px] md:text-[13px] font-black shadow-sm"><option>{LANGS_LIST.find(l=>l.code===lang)?.native}</option>{LANGS_LIST.map(l=><option key={l.code} value={l.code}>{l.native}</option>)}</select><span className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white px-4 py-2.5 rounded-full text-[10px] font-black shadow-lg"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span> {user.primaryNo} • {user.planName} ₹{user.planPrice} • {user.planTeamLimit} Team • 24x7 AI</span><button onClick={()=>setShowAuth(true)} className="bg-gradient-to-r from-violet-600 to-blue-600 text-white px-4 md:px-5 py-2 md:py-2.5 rounded-full text-[11px] md:text-[13px] font-black shadow-lg">Login →</button><button onClick={()=>{localStorage.clear(); window.location.reload()}} className="bg-red-50 text-red-600 border border-red-100 px-3 py-2 rounded-full text-[10px] font-black">Logout</button></div></div></div>
      <div className="relative max-w-[1400px] mx-auto p-3 md:p-6 flex-1 w-full">{user.role==='super'?<SuperAdmin allUsers={allUsers} setAllUsers={setAllUsers} lang={lang} setLang={setLang}/>:<ToolUser user={user} lang={lang} setLang={setLang}/>}</div>
      <div className="relative bg-white/90 backdrop-blur-xl border-t border-white/50 py-4"><div className="max-w-[1400px] mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-3 text-[10px] md:text-[11px] text-gray-500"><div className="flex items-center gap-3"><Logo size="small"/><span className="font-medium">© {new Date().getFullYear()} CloserBlue • 24x7 Work With AI Chat on WhatsApp With Your Customer • Starter 999 (1 team) | Pro 2499 (3 team) | Enterprise 4999 (6 team) | Yearly 20% OFF | Extra 999 | 25 Languages | Mobile Friendly | Any AI - Gemini, ChatGPT, Claude, Grok, DeepSeek | CRM + DB Tool + Sheet Auto Chat + Bulk + Business PDF + Negotiation + Payment Link</span></div><div className="flex gap-2"><span className="bg-black text-white px-3 py-1 rounded-full font-black">24x7 AI Active</span><span className="bg-violet-600 text-white px-3 py-1 rounded-full font-black">Mobile Friendly</span></div></div></div>
    </div>
  )
}

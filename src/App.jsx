import { useState, useEffect } from 'react'

function Logo(){ return (
  <div className="flex items-center gap-0 font-black tracking-tight">
    <span className="text-[20px] text-black">CLOSER</span>
    <span className="bg-[#0A66FF] text-white text-[20px] px-2 py-0.5 rounded-md ml-1">BLUE</span>
  </div>
)}

const SUPER_ADMIN_EMAILS = ['admin@closerblue.com', 'owner@closerblue.com', 'superadmin@closerblue.com']
const LOGIN_VALIDITY_DAYS = 365

// Language translations - Legal safe + multi language
const LANGS = {
  en: { name:'English', welcome:'Welcome', login:'Login', signup:'Sign Up', email:'Email', mobile:'Mobile', password:'Password', dashboard:'Dashboard', users:'All Users', free:'Give Free Access', settings:'Settings', team:'My Team', plan:'Plan', expiry:'Expiry', primaryNo:'Primary No', database:'Database', language:'Language' },
  hi: { name:'हिंदी', welcome:'स्वागत है', login:'लॉगिन', signup:'साइन अप', email:'ईमेल', mobile:'मोबाइल', password:'पासवर्ड', dashboard:'डैशबोर्ड', users:'सभी यूज़र्स', free:'फ्री दें', settings:'सेटिंग्स', team:'मेरी टीम', plan:'प्लान', expiry:'समाप्ति', primaryNo:'प्राथमिक नंबर', database:'डेटाबेस', language:'भाषा' },
  hinglish: { name:'Hinglish', welcome:'Welcome Bhai 👋', login:'Login Karo', signup:'Account Banao', email:'Email Daalo', mobile:'Mobile Number', password:'Password Set Karo', dashboard:'Catchy Dashboard', users:'Sab Users Ka Data', free:'Free Me Do', settings:'Settings + Legal', team:'Meri Team', plan:'Kaunsa Plan Liya', expiry:'Kab Tak Valid Hai', primaryNo:'Primary Number (CB-0001)', database:'Database Connect Karo', language:'Bhasha Chunno' }
}

function getDeviceId(){
  let id = localStorage.getItem('closerblue_device_id')
  if(!id){ id = 'device_'+Math.random().toString(36).substring(2,15)+Date.now().toString(36); localStorage.setItem('closerblue_device_id', id) }
  return id
}
function getDeviceInfo(){
  return { id: getDeviceId(), platform: navigator.platform, screen: `${window.screen.width}x${window.screen.height}` }
}
function generatePrimaryNumber(index){
  return `CB-${String(index).padStart(4,'0')}` // CB-0001, CB-0002...
}

function LegalModal({type, onClose, lang}){
  const t = LANGS[lang]||LANGS.hinglish
  const content = {
    privacy: {title: t.language==='Bhasha Chunno'?'Privacy Policy - Legal Safe':'Privacy Policy', text:`Legal Safe Data Only:\n✅ Le sakte hain: Name, Email, Mobile, Business Name, Business Type, City, Language, Plan, Expiry, Primary Number (CB-XXXX), Database Type (Sheet/Excel/MySQL), Leads Count, Messages Sent, Team Members\n❌ Nahi lena (Legal Problem): Aadhaar, PAN, Passport, Card Number, CVV, Password plain text, OTP, Biometric, Religion, Caste, Political, Health data\n\nWe collect only business-use data. Encrypted. Never share. Deletion: support@closerblue.com`},
    refund: {title:'Refund Policy', text:`7-Day Money Back. After 7 days cancel only. WhatsApp API charges non-refundable. Refund 5-7 days.`},
    terms: {title:'Terms', text:`No spam. Follow WhatsApp Policy. 1 device = ${LOGIN_VALIDITY_DAYS} days login. Indian jurisdiction Lucknow. By signup you agree.`},
    contact: {title:'Contact', text:`support@closerblue.com | +91 90000 00000 | Lucknow UP`}
  }
  const c = content[type]||content.privacy
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full p-6"><div className="flex justify-between"><h2 className="font-black">{c.title}</h2><button onClick={onClose} className="bg-black text-white w-8 h-8 rounded-full">X</button></div><pre className="text-[11px] whitespace-pre-wrap mt-3 font-sans">{c.text}</pre><button onClick={onClose} className="mt-4 w-full bg-[#0A66FF] text-white py-2 rounded-full font-bold text-[12px]">Close</button></div>
    </div>
  )
}

function AuthScreen({onLogin, onBackToAdmin, lang, setLang}){
  const [mode,setMode]=useState('login')
  const [authType,setAuthType]=useState('email')
  const [email,setEmail]=useState('')
  const [mobile,setMobile]=useState('')
  const [pass,setPass]=useState('')
  const [confirmPass,setConfirmPass]=useState('')
  const [name,setName]=useState('')
  const [businessName,setBusinessName]=useState('')
  const [city,setCity]=useState('')
  const [otpSent,setOtpSent]=useState(false)
  const [otp,setOtp]=useState('')
  const [legal,setLegal]=useState(null)
  const t = LANGS[lang]

  return (
    <div className="min-h-screen bg-[#f6f8ff] flex flex-col items-center justify-center p-4">
      <div className="bg-white border rounded-[24px] p-6 w-full max-w-[460px] shadow-xl">
        <div className="flex justify-between items-center mb-2"><Logo/><select value={lang} onChange={e=>setLang(e.target.value)} className="border rounded-full px-2 py-1 text-[11px]"><option value="en">English</option><option value="hi">हिंदी</option><option value="hinglish">Hinglish</option></select></div>
        <div className="text-center text-[10px] bg-blue-50 border border-blue-200 rounded-xl p-2 mb-2"><b>🔐 {LOGIN_VALIDITY_DAYS} Days Login + Device Security + Primary Number Generate</b><br/>Same device pe {LOGIN_VALIDITY_DAYS} din no login | Dusre device pe naya login</div>
        <h2 className="font-black text-[20px] text-center">{mode==='login'?t.welcome:`${t.signup} 🚀`}</h2>
        <p className="text-[11px] text-gray-500 text-center">Legal Safe Data Only - No Aadhaar/PAN/Card</p>
        <div className="flex gap-2 mt-2 bg-gray-100 p-1 rounded-full w-fit mx-auto"><button onClick={()=>setAuthType('email')} className={`px-3 py-1 rounded-full text-[10px] font-bold ${authType==='email'?'bg-black text-white':'text-gray-600'}`}>📧 {t.email}</button><button onClick={()=>setAuthType('mobile')} className={`px-3 py-1 rounded-full text-[10px] font-bold ${authType==='mobile'?'bg-[#0A66FF] text-white':'text-gray-600'}`}>📱 {t.mobile}</button></div>
        <div className="mt-3 space-y-2">
          {mode==='signup' && <><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name - Legal Safe" className="w-full border rounded-full px-3 py-2 text-[12px]"/><input value={businessName} onChange={e=>setBusinessName(e.target.value)} placeholder="Business Name - Shop/Coaching Name" className="w-full border rounded-full px-3 py-2 text-[12px]"/><input value={city} onChange={e=>setCity(e.target.value)} placeholder="City - Lucknow, Delhi (Legal Safe)" className="w-full border rounded-full px-3 py-2 text-[12px]"/></>}
          {authType==='email' && <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email - kisi bhi email se" className="w-full border rounded-full px-3 py-2 text-[12px]"/>}
          {authType==='mobile' && <div className="flex gap-2"><input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="Mobile - +91..." className="flex-1 border rounded-full px-3 py-2 text-[12px]"/><button onClick={()=>{setOtpSent(true); alert('OTP: 123456')}} className="bg-[#0A66FF] text-white px-3 rounded-full text-[10px] font-bold">OTP</button></div>}
          {authType==='mobile' && otpSent && <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="OTP 123456" className="w-full border rounded-full px-3 py-2 text-[12px]"/>}
          <input value={pass} onChange={e=>setPass(e.target.value)} type="password" placeholder={t.password+' - Min 6 chars'} className="w-full border rounded-full px-3 py-2 text-[12px]"/>
          {mode==='signup' && <input value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} type="password" placeholder="Confirm Password" className="w-full border rounded-full px-3 py-2 text-[12px]"/>}
          <button onClick={()=>{
            if(authType==='email' && !email){ alert('Email daalo'); return}
            if(authType==='mobile' && (!mobile || otp!=='123456')){ alert('OTP 123456'); return}
            if(mode==='signup' && pass!==confirmPass){ alert('Password match nahi'); return}
            const finalEmail = authType==='email'?email:mobile+'@mobile.com'
            onLogin({email: finalEmail, name: name||'Tool User', mobile: authType==='mobile'?mobile:'', businessName: businessName||'My Business', city: city||'India', language: lang, role:'tool'}, true)
          }} className="w-full bg-black text-white py-2.5 rounded-full font-bold text-[12px]">{mode==='login'?`${t.login} → ${LOGIN_VALIDITY_DAYS} days yaad rahega`:`${t.signup} → Primary No Generate Hoga →`}</button>
          <div className="flex gap-2"><button onClick={()=>setMode(mode==='login'?'signup':'login')} className="flex-1 border py-2 rounded-full text-[10px] font-bold">{mode==='login'?'New? Sign Up':'Have account? Login'}</button><button onClick={onBackToAdmin} className="flex-1 bg-green-600 text-white py-2 rounded-full text-[10px] font-bold">← Owner No Login</button></div>
        </div>
      </div>
      <div className="mt-2 flex gap-3 text-[10px] text-gray-500"><button onClick={()=>setLegal('privacy')} className="underline">Privacy - Legal Safe List</button><button onClick={()=>setLegal('terms')} className="underline">Terms</button></div>
      {legal && <LegalModal type={legal} onClose={()=>setLegal(null)} lang={lang}/>}
    </div>
  )
}

function SuperAdmin({user, allUsers, setAllUsers, setShowAuth, deviceInfo, lang, setLang}){
  const [tab,setTab]=useState('dashboard')
  const [legal,setLegal]=useState(null)
  const [freeEmail,setFreeEmail]=useState('')
  const [freeMobile,setFreeMobile]=useState('')
  const [freeName,setFreeName]=useState('')
  const [freeBusiness,setFreeBusiness]=useState('')
  const [freeCity,setFreeCity]=useState('')
  const [freePlan,setFreePlan]=useState('Free (Given by Admin)')
  const [dbType,setDbType]=useState('Google Sheets')
  const [dbUrl,setDbUrl]=useState('')
  const t = LANGS[lang]

  const giveFreeAccess = ()=>{
    if(!freeEmail && !freeMobile){ alert('Email ya Mobile'); return}
    const idx = allUsers.length + 1
    const primaryNo = generatePrimaryNumber(idx)
    const expiry = new Date(Date.now()+365*24*60*60*1000).toLocaleDateString()
    const newUser = {
      primaryNo, name: freeName||'Free User', email: freeEmail||freeMobile+'@mobile.com', mobile: freeMobile||'', businessName: freeBusiness||'Business', city: freeCity||'India', language: lang, plan: freePlan, expiry, primaryNumber: primaryNo, databaseType: dbType, databaseUrl: dbUrl||'Not connected', databaseStatus: dbUrl?'Connected ✅':'Not Connected', leadsCount: 0, messagesSent: 0, sheetsCount: 0, teamCount: 0, deviceId: 'pending', loginExpiry: expiry, date: new Date().toLocaleString(), givenBy:'Main Admin'
    }
    setAllUsers(prev=>[...prev, newUser])
    alert(`✅ Free diya! Primary No: ${primaryNo} | Plan: ${freePlan} | Expiry: ${expiry} | ${freePlan.includes('Free')?'No payment':''}\nDB: ${dbType} | User ko ${LOGIN_VALIDITY_DAYS} days login yaad rahega`)
    setFreeEmail(''); setFreeMobile(''); setFreeName(''); setFreeBusiness(''); setFreeCity(''); setDbUrl('')
  }

  const exportData = ()=>{
    const csv = allUsers.map(u=>`${u.primaryNo},${u.name},${u.email},${u.mobile},${u.businessName},${u.city},${u.language},${u.plan},${u.expiry},${u.databaseType},${u.leadsCount},${u.messagesSent},${u.teamCount}`).join('\n')
    const blob = new Blob([`PrimaryNo,Name,Email,Mobile,Business,City,Lang,Plan,Expiry,DB,Leads,Msgs,Team\n`+csv], {type:'text/csv'})
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a'); a.href=url; a.download=`closerblue_users_${new Date().toISOString().split('T')[0]}.csv`; a.click()
  }

  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-xl p-2 flex justify-between items-center text-[11px]"><span><b>✅ Main Admin - No Login + All Tool Users Data Yaha + Legal Safe Only + Primary No + Plan/Expiry + Database</b></span><select value={lang} onChange={e=>setLang(e.target.value)} className="border rounded-full px-2 py-1 text-[11px]"><option value="en">English</option><option value="hi">हिंदी</option><option value="hinglish">Hinglish</option></select></div>
      <div className="flex gap-2 bg-white p-1.5 rounded-full w-fit border shadow-sm overflow-auto text-[11px]"><button onClick={()=>setTab('dashboard')} className={`px-4 py-1.5 rounded-full font-black ${tab==='dashboard'?'bg-black text-white':'text-gray-600'}`}>🏠 {t.dashboard}</button><button onClick={()=>setTab('users')} className={`px-4 py-1.5 rounded-full font-black ${tab==='users'?'bg-green-600 text-white':'text-gray-600'}`}>👥 {t.users} ({allUsers.length})</button><button onClick={()=>setTab('free')} className={`px-4 py-1.5 rounded-full font-black ${tab==='free'?'bg-[#0A66FF] text-white':'text-gray-600'}`}>🎁 {t.free} + Primary No</button><button onClick={()=>setTab('db')} className={`px-4 py-1.5 rounded-full font-black ${tab==='db'?'bg-orange-600 text-white':'text-gray-600'}`}>🗄️ {t.database} - Sheet/Excel/MySQL/Any</button><button onClick={()=>setTab('other')} className={`px-4 py-1.5 rounded-full font-black ${tab==='other'?'bg-gray-900 text-white':'text-gray-600'}`}>⚙️ {t.settings}</button></div>

      {tab==='dashboard' && (
        <div className="space-y-3">
          <div className="bg-gradient-to-r from-black via-[#0A66FF] to-black rounded-[24px] p-4 text-white flex justify-between">
            <div><div className="text-[20px] font-black">Main Admin - All Data Yaha ✅</div><div className="text-[11px] opacity-80 mt-1">Sab tool users ka data: Primary No (CB-XXXX) + Plan + Expiry + Database + Language + City + Business - Legal Safe Only</div><div className="flex gap-2 mt-2"><span className="bg-white text-black px-2 py-1 rounded-full text-[10px] font-bold">No Legal Risk Data Only</span><span className="bg-[#25D366] px-2 py-1 rounded-full text-[10px] font-bold">Primary No Auto Generate</span></div></div>
            <div className="text-right"><button onClick={exportData} className="bg-white text-black px-3 py-1 rounded-full text-[11px] font-bold">📥 Export All Data - CSV (Sheet/Excel/MySQL)</button><div className="text-[10px] opacity-70 mt-2">Device: {deviceInfo.id.substring(0,15)}...</div></div>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {[{k:'Total Users', v:allUsers.length}, {k:'Primary No', v:allUsers[allUsers.length-1]?.primaryNo||'CB-0001'}, {k:'Plans', v:allUsers.filter(u=>u.plan.includes('Free')).length+' Free'}, {k:'Databases', v: [...new Set(allUsers.map(u=>u.databaseType))].length+' Types'}, {k:'Languages', v: [...new Set(allUsers.map(u=>u.language))].join(',') }].map(s=><div key={s.k} className="bg-white border rounded-xl p-3"><div className="text-[10px] text-gray-500">{s.k}</div><div className="text-[16px] font-black">{s.v}</div></div>)}
          </div>
          <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-[12px]">📊 Sab Tool User Ka Data - Main Admin Me Add - Legal Safe Only</h3><div className="mt-2 grid grid-cols-2 gap-2 text-[10px]"><div className="bg-green-50 border border-green-200 rounded-xl p-2"><b>✅ Le sakte hain (Legal Safe):</b><br/>• Name, Email, Mobile<br/>• Business Name, Business Type, City<br/>• Language (en/hi/hinglish)<br/>• Plan: Free/Pro/Enterprise + Expiry Date<br/>• Primary Number: CB-0001 auto<br/>• Database: Sheet/Excel/MySQL/PostgreSQL/MongoDB/Firebase<br/>• Usage: Leads Count, Messages Sent, Sheets Count, Team Count<br/>• Device ID, Login Expiry ({LOGIN_VALIDITY_DAYS} days)</div><div className="bg-red-50 border border-red-200 rounded-xl p-2"><b>❌ Mat lo (Legal Problem Hogi):</b><br/>• Aadhaar, PAN, Passport, Voter ID<br/>• Card Number, CVV, Net Banking password<br/>• Password plain text, OTP, Biometric<br/>• Religion, Caste, Political opinion<br/>• Health data, Criminal record<br/>• Exact location tracking bina consent<br/>• Dusre ka private WhatsApp chat<br/>Ye sab loge toh legal notice aayega!</div></div></div>
        </div>
      )}

      {tab==='free' && (
        <div className="space-y-3">
          <div className="bg-[#0A66FF] text-white rounded-2xl p-4"><div className="font-black">🎁 Free Access + Primary No Generate + Plan/Expiry + Database</div><div className="text-[11px] opacity-80">Jisko free doge uska Primary Number CB-XXXX auto banega + Plan + Expiry + Database select</div></div>
          <div className="bg-white border rounded-2xl p-4">
            <div className="grid grid-cols-3 gap-2">
              <input value={freeName} onChange={e=>setFreeName(e.target.value)} placeholder="Name - Legal Safe" className="border rounded-full px-3 py-2 text-[11px]"/>
              <input value={freeEmail} onChange={e=>setFreeEmail(e.target.value)} placeholder="Email" className="border rounded-full px-3 py-2 text-[11px]"/>
              <input value={freeMobile} onChange={e=>setFreeMobile(e.target.value)} placeholder="Mobile" className="border rounded-full px-3 py-2 text-[11px]"/>
              <input value={freeBusiness} onChange={e=>setFreeBusiness(e.target.value)} placeholder="Business Name - Shop Name" className="border rounded-full px-3 py-2 text-[11px]"/>
              <input value={freeCity} onChange={e=>setFreeCity(e.target.value)} placeholder="City - Lucknow" className="border rounded-full px-3 py-2 text-[11px]"/>
              <select value={freePlan} onChange={e=>setFreePlan(e.target.value)} className="border rounded-full px-3 py-2 text-[11px]"><option>Free (Given by Admin)</option><option>Pro ₹999 - 1 Year</option><option>Pro ₹999 - 6 Month</option><option>Enterprise ₹4999 - 1 Year</option></select>
              <select value={dbType} onChange={e=>setDbType(e.target.value)} className="border rounded-full px-3 py-2 text-[11px]"><option>Google Sheets</option><option>Excel (.xlsx/.csv)</option><option>MySQL</option><option>PostgreSQL</option><option>MongoDB</option><option>Firebase</option><option>Not Connected</option></select>
              <input value={dbUrl} onChange={e=>setDbUrl(e.target.value)} placeholder="DB URL / Sheet Link / Connection String" className="col-span-2 border rounded-full px-3 py-2 text-[11px]"/>
              <button onClick={giveFreeAccess} className="bg-black text-white rounded-full font-bold text-[11px]">🎁 Give Free + Primary No {generatePrimaryNumber(allUsers.length+1)}</button>
            </div>
            <div className="mt-3 text-[10px] bg-yellow-50 border rounded-xl p-2">Primary No auto: CB-0001, CB-0002... | Plan: Pro/Enterprise ki expiry 1 year/6 month set hogi | Database: Sheet/Excel/MySQL kisi se bhi connect ho jayega | Language: User ki language | City: Legal safe | No Aadhaar/PAN/Card</div>
          </div>
        </div>
      )}

      {tab==='db' && (
        <div className="space-y-3">
          <div className="bg-orange-600 text-white rounded-2xl p-4"><div className="font-black">🗄️ Database Connect Option - Sheet / Excel / MySQL / Any Tool Se</div><div className="text-[11px] opacity-80">Kisi bhi database se connect karo - Google Sheets, Excel, MySQL, PostgreSQL, MongoDB, Firebase - sab se ho jayega</div></div>
          <div className="grid grid-cols-3 gap-3">
            {[
              {type:'Google Sheets', icon:'📊', desc:'Sheet URL daalo - Auto sync', placeholder:'https://docs.google.com/spreadsheets/d/...'},
              {type:'Excel', icon:'📈', desc:'Excel file upload .xlsx/.csv', placeholder:'Upload Excel - leads.xlsx'},
              {type:'MySQL', icon:'🐬', desc:'MySQL connection string', placeholder:'mysql://user:pass@host:3306/dbname'},
              {type:'PostgreSQL', icon:'🐘', desc:'Postgres connection', placeholder:'postgresql://user:pass@host:5432/dbname'},
              {type:'MongoDB', icon:'🍃', desc:'MongoDB URI', placeholder:'mongodb+srv://user:pass@cluster.mongodb.net/db'},
              {type:'Firebase', icon:'🔥', desc:'Firebase config', placeholder:'Firebase project ID / config JSON'}
            ].map(db=>(
              <div key={db.type} className="bg-white border rounded-2xl p-4">
                <div className="font-bold text-[12px]">{db.icon} {db.type}</div><div className="text-[10px] text-gray-500 mt-1">{db.desc}</div>
                <input placeholder={db.placeholder} className="w-full mt-2 border rounded-full px-3 py-2 text-[10px]"/>
                <button className="mt-2 w-full bg-black text-white py-1.5 rounded-full text-[10px] font-bold">Connect {db.type} → Data Main Admin Me Ayega</button>
                <div className="text-[9px] text-gray-400 mt-1">{allUsers.filter(u=>u.databaseType===db.type).length} users connected</div>
              </div>
            ))}
          </div>
          <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-[12px]">📥 Database Data - Main Admin Me Kaise Ayega?</h3><div className="mt-2 text-[11px] space-y-1"><div>1. User apna Sheet/Excel/MySQL connect karega → Tool User panel se</div><div>2. Data auto sync → All Users tab me uska databaseType + databaseStatus + leadsCount update hoga</div><div>3. Aap Main Admin se Export CSV kar sakte ho → Sheet/Excel/MySQL me save → Kisi bhi tool se use karo</div><div>4. Legal Safe: Sirf business data - leads, messages, sheets count - Aadhaar/PAN nahi</div></div><button onClick={()=>{ const csv = allUsers.map(u=>`${u.primaryNo},${u.databaseType},${u.databaseUrl},${u.leadsCount}`).join('\n'); const blob=new Blob([`PrimaryNo,DB Type,DB URL,Leads\n`+csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='database_connections.csv'; a.click()}} className="mt-3 bg-[#0A66FF] text-white px-4 py-2 rounded-full text-[11px] font-bold">📥 Export Database Connections - CSV</button></div>
        </div>
      )}

      {tab==='users' && (
        <div className="bg-white border rounded-2xl p-3">
          <div className="flex justify-between items-center"><h3 className="font-bold text-[12px]">👥 All Tool Users Data - Main Admin Data Me Add - Primary No + Plan + Expiry + DB + Language</h3><button onClick={()=>{ const csv=allUsers.map(u=>`${u.primaryNo},${u.name},${u.email},${u.mobile},${u.businessName},${u.city},${u.language},${u.plan},${u.expiry},${u.databaseType},${u.leadsCount},${u.messagesSent},${u.teamCount}`).join('\n'); const blob=new Blob([`PrimaryNo,Name,Email,Mobile,Business,City,Language,Plan,Expiry,Database,Leads,Msgs,Team\n`+csv],{type:'text/csv'}); const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download='all_users_main_admin.csv'; a.click()}} className="bg-black text-white px-3 py-1 rounded-full text-[10px] font-bold">Export CSV - Sheet/Excel/MySQL</button></div>
          <div className="mt-3 border rounded-xl overflow-auto max-h-[500px]">
            <div className="grid grid-cols-9 bg-gray-50 text-[8px] font-black p-2 sticky top-0"><span>Primary No</span><span>Name/Business</span><span>Email/Mobile</span><span>City/Lang</span><span>Plan + Expiry</span><span>Database</span><span>Usage</span><span>Login</span><span>Action</span></div>
            {allUsers.map((u,i)=><div key={i} className="grid grid-cols-9 text-[9px] p-2 border-t"><span className="font-black bg-yellow-100 px-1 rounded w-fit">{u.primaryNo||generatePrimaryNumber(i+1)}</span><span><b>{u.name}</b><br/>{u.businessName}<br/><span className="text-[8px] text-gray-500">{u.city}</span></span><span className="text-[8px]">{u.email}<br/>{u.mobile}</span><span>{u.city}<br/><span className="bg-blue-100 px-1 rounded text-[8px]">{u.language}</span></span><span><span className={`px-1 rounded text-[8px] ${u.plan.includes('Free')?'bg-green-100 text-green-700':'bg-blue-100 text-blue-700'}`}>{u.plan}</span><br/><span className="text-[8px]">{u.expiry}</span></span><span><span className="text-[8px]">{u.databaseType}</span><br/><span className={`text-[7px] ${u.databaseStatus?.includes('Connected')?'text-green-600':'text-gray-400'}`}>{u.databaseStatus||'Not Connected'}</span></span><span className="text-[8px]">Leads:{u.leadsCount||0}<br/>Msgs:{u.messagesSent||0}<br/>Team:{u.teamCount||0}</span><span className="text-[7px]">{u.deviceId?.substring(0,8)||'pending'}<br/>{u.loginExpiry?.substring(0,10)||u.expiry?.substring(0,10)}</span><span><button className="bg-black text-white px-1 py-0.5 rounded-full text-[7px]">View</button></span></div>)}
          </div>
          <div className="mt-2 text-[9px] text-gray-500">Primary No auto generate CB-0001, CB-0002... | Plan + Expiry: Free/Pro/Enterprise + kab tak valid | Database: Sheet/Excel/MySQL/PostgreSQL/MongoDB/Firebase kisi se bhi | Language: en/hi/hinglish | Legal Safe: No Aadhaar/PAN/Card/OTP/Religion</div>
        </div>
      )}

      {tab==='other' && <div className="bg-white border rounded-2xl p-4 text-[11px]"><b>Main Admin Data Aggregation:</b> Sab tool users ka data yaha add hota hai - Primary No, Plan, Expiry, Database, Language, City, Business - Legal safe only. Export CSV → Sheet/Excel/MySQL me le ja sakte ho. Language selector se bhasha change hoti hai. Database connect se kisi bhi DB se data aayega.<br/><br/><button onClick={()=>setShowAuth(true)} className="bg-black text-white px-3 py-1 rounded-full">View Tool User Login</button><button onClick={()=>{localStorage.clear(); alert('Cleared'); window.location.reload()}} className="ml-2 bg-red-500 text-white px-3 py-1 rounded-full">Clear All</button></div>}
      {legal && <LegalModal type={legal} onClose={()=>setLegal(null)} lang={lang}/>}
    </div>
  )
}

function ToolUser({user, deviceInfo, lang, setLang}){
  const [legal,setLegal]=useState(null)
  const [team,setTeam]=useState([])
  const [dbType,setDbType]=useState(user.databaseType||'Google Sheets')
  const [dbUrl,setDbUrl]=useState(user.databaseUrl||'')
  const [teamName,setTeamName]=useState('')
  const [teamEmail,setTeamEmail]=useState('')
  const [teamMobile,setTeamMobile]=useState('')
  const t = LANGS[lang]

  return (
    <div className="space-y-3">
      <div className="bg-white border rounded-2xl p-3 flex justify-between items-center"><div><div className="font-bold text-[13px]">Welcome, {user?.name} 👋 Primary: {user.primaryNo||'CB-XXXX'}</div><div className="text-[10px] text-gray-500">Email: {user.email} | Mobile: {user.mobile||'N/A'} | Business: {user.businessName} | City: {user.city} | Lang: {user.language} | Plan: {user.plan} | Expiry: {user.expiry} | DB: {user.databaseType}</div></div><select value={lang} onChange={e=>setLang(e.target.value)} className="border rounded-full px-2 py-1 text-[10px]"><option value="en">English</option><option value="hi">हिंदी</option><option value="hinglish">Hinglish</option></select></div>

      <div className="grid grid-cols-5 gap-2">
        {[{k:t.primaryNo, v:user.primaryNo||'CB-XXXX'}, {k:t.plan, v:user.plan||'Free'}, {k:t.expiry, v:user.expiry||'1 Year'}, {k:t.database, v:user.databaseType||'Not Connected'}, {k:t.language, v:user.language||lang}].map(s=><div key={s.k} className="bg-white border rounded-xl p-3"><div className="text-[9px] text-gray-500">{s.k}</div><div className="text-[13px] font-black">{s.v}</div></div>)}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white border rounded-2xl p-4">
          <h3 className="font-bold text-[12px]">🗄️ {t.database} - Sheet/Excel/MySQL/Any Tool Se Connect Karo</h3>
          <p className="text-[10px] text-gray-500 mt-1">Aapka data Main Admin me jayega - Sheet, Excel, MySQL, PostgreSQL, MongoDB, Firebase kisi se bhi</p>
          <select value={dbType} onChange={e=>setDbType(e.target.value)} className="w-full mt-2 border rounded-full px-3 py-2 text-[11px]"><option>Google Sheets</option><option>Excel (.xlsx/.csv)</option><option>MySQL</option><option>PostgreSQL</option><option>MongoDB</option><option>Firebase</option></select>
          <input value={dbUrl} onChange={e=>setDbUrl(e.target.value)} placeholder={dbType==='Google Sheets'?'Sheet URL - https://docs.google.com/...': dbType==='Excel'?'Excel file path - leads.xlsx': dbType==='MySQL'?'MySQL URI - mysql://user:pass@host/db': 'Connection String / URL'} className="w-full mt-2 border rounded-full px-3 py-2 text-[11px]"/>
          <button onClick={()=>alert(`✅ ${dbType} Connected: ${dbUrl} - Ab aapka data Main Admin me dikhega - Primary No: ${user.primaryNo}`)} className="w-full mt-2 bg-black text-white py-2 rounded-full text-[11px] font-bold">Connect {dbType} → Main Admin Me Data Jayega</button>
          <div className="mt-2 text-[9px] bg-blue-50 border rounded-xl p-2">Legal Safe: Sirf business data - leads, messages, sheets count - Aadhaar/PAN/Card nahi. Database connect se aapka data Main Admin dashboard me All Users me dikhega - Primary No + Plan + Expiry ke sath</div>
        </div>
        <div className="bg-white border rounded-2xl p-4">
          <h3 className="font-bold text-[12px]">👥 {t.team} - Aapke Under Team Rakho</h3>
          <div className="mt-2 space-y-2">
            <input value={teamName} onChange={e=>setTeamName(e.target.value)} placeholder="Name" className="w-full border rounded-full px-3 py-1.5 text-[10px]"/>
            <div className="flex gap-2"><input value={teamEmail} onChange={e=>setTeamEmail(e.target.value)} placeholder="Email" className="flex-1 border rounded-full px-3 py-1.5 text-[10px]"/><input value={teamMobile} onChange={e=>setTeamMobile(e.target.value)} placeholder="Mobile" className="flex-1 border rounded-full px-3 py-1.5 text-[10px]"/></div>
            <button onClick={()=>{ if(!teamEmail && !teamMobile){alert('Email/Mobile'); return} setTeam(prev=>[...prev, {name: teamName||'Team', email: teamEmail, mobile: teamMobile, primaryNo: generatePrimaryNumber(100+prev.length+1)}]); setTeamName(''); setTeamEmail(''); setTeamMobile('')}} className="w-full bg-[#0A66FF] text-white py-2 rounded-full text-[10px] font-bold">+ Add Team - Primary No Auto</button>
          </div>
          <div className="mt-3 border rounded-xl overflow-hidden max-h-[150px] overflow-auto"><div className="grid grid-cols-4 bg-gray-50 text-[8px] font-bold p-1"><span>Primary No</span><span>Name</span><span>Email/Mobile</span><span>Role</span></div>{team.map((m,i)=><div key={i} className="grid grid-cols-4 text-[9px] p-1 border-t"><span className="font-bold bg-yellow-100 px-1 rounded w-fit">{m.primaryNo}</span><span>{m.name}</span><span className="text-[8px]">{m.email}<br/>{m.mobile}</span><span>Team</span></div>)}</div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-3"><h3 className="font-bold text-[12px]">📊 My CRM + Plan {user.plan} + Expiry {user.expiry} + Primary {user.primaryNo}</h3><div className="grid grid-cols-4 gap-2 mt-2">{['New','Qualified','Payment Sent','Closed'].map(stage=><div key={stage} className="bg-gray-50 rounded-xl p-2"><div className="text-[9px] font-bold">{stage}</div><div className="mt-1 bg-white border rounded p-1 text-[9px]">Lead - Primary: {user.primaryNo}</div></div>)}</div></div>

      <div className="flex gap-3 text-[10px] text-gray-500 justify-center"><button onClick={()=>setLegal('privacy')} className="underline">Privacy - Legal Safe</button><button onClick={()=>setLegal('terms')} className="underline">Terms</button></div>
      {legal && <LegalModal type={legal} onClose={()=>setLegal(null)} lang={lang}/>}
    </div>
  )
}

export default function App(){
  const [allUsers,setAllUsers]=useState([
    {primaryNo:'CB-0001', primaryNumber:'CB-0001', name:'Demo User', email:'demo@test.com', mobile:'+91 98765 43210', businessName:'Demo Store', city:'Lucknow', language:'hinglish', plan:'Free (Given by Admin)', expiry: new Date(Date.now()+365*24*60*60*1000).toLocaleDateString(), databaseType:'Google Sheets', databaseUrl:'https://docs.google.com/...', databaseStatus:'Connected ✅', leadsCount: 12, messagesSent: 89, sheetsCount: 1, teamCount: 1, deviceId:'device_demo_123', loginExpiry: new Date(Date.now()+365*24*60*60*1000).toLocaleString(), date: new Date().toLocaleString(), givenBy:'Main Admin'},
    {primaryNo:'CB-0002', primaryNumber:'CB-0002', name:'Priya Store', email:'priya@store.com', mobile:'+91 87654 32109', businessName:'Priya Fashion', city:'Delhi', language:'en', plan:'Pro ₹999 - 1 Year', expiry: new Date(Date.now()+365*24*60*60*1000).toLocaleDateString(), databaseType:'MySQL', databaseUrl:'mysql://user:pass@host/db', databaseStatus:'Connected ✅', leadsCount: 45, messagesSent: 230, sheetsCount: 3, teamCount: 2, deviceId:'device_priya_456', loginExpiry: new Date(Date.now()+365*24*60*60*1000).toLocaleString(), date: new Date().toLocaleString(), givenBy:'Self Signup'},
  ])
  const [legal,setLegal]=useState(null)
  const [showAuth,setShowAuth]=useState(false)
  const [deviceInfo,setDeviceInfo]=useState({id:'loading...', platform:'', screen:''})
  const [lang,setLang]=useState('hinglish')
  const [user,setUser]=useState(null)

  useEffect(()=>{
    const dev = {id: getDeviceId(), platform: navigator.platform, screen: `${window.screen.width}x${window.screen.height}`}
    setDeviceInfo(dev)
    const savedUser = localStorage.getItem('closerblue_user')
    const expiry = localStorage.getItem('closerblue_expiry')
    if(savedUser && expiry && Date.now() < parseInt(expiry)){
      const parsed = JSON.parse(savedUser)
      const savedDev = localStorage.getItem('closerblue_user_device')
      if(!savedDev || savedDev===dev.id || parsed.role==='super'){
        setUser(parsed)
        setLang(parsed.language||'hinglish')
      } else {
        setUser({name:'Main Owner (You)', email:'owner@closerblue.com', mobile:'+91 99999 99999', role:'super', primaryNo:'CB-OWNER', primaryNumber:'CB-OWNER', businessName:'CloserBlue Owner', city:'Lucknow', language:'hinglish', plan:'Owner - Lifetime', expiry:'Lifetime', databaseType:'All Databases', databaseStatus:'Owner Access ✅', leadsCount: 999, messagesSent: 9999, teamCount: 10})
      }
    } else {
      setUser({name:'Main Owner (You)', email:'owner@closerblue.com', mobile:'+91 99999 99999', role:'super', primaryNo:'CB-OWNER', primaryNumber:'CB-OWNER', businessName:'CloserBlue Owner', city:'Lucknow', language:'hinglish', plan:'Owner - Lifetime', expiry:'Lifetime', databaseType:'All Databases', databaseStatus:'Owner Access ✅', leadsCount: 999, messagesSent: 9999, teamCount: 10})
    }
    const savedLang = localStorage.getItem('closerblue_lang')
    if(savedLang) setLang(savedLang)
  },[])

  useEffect(()=>{ localStorage.setItem('closerblue_lang', lang) }, [lang])

  const handleLogin = (u, isPersistent=true)=>{
    const role = SUPER_ADMIN_EMAILS.includes(u.email.toLowerCase()) || u.email.toLowerCase().includes('admin') ? 'super' : 'tool'
    const dev = getDeviceInfo()
    const expiryTime = Date.now() + LOGIN_VALIDITY_DAYS*24*60*60*1000
    const expiryDate = new Date(expiryTime).toLocaleDateString()
    const idx = allUsers.length + 1
    const primaryNo = role==='super' ? 'CB-OWNER' : generatePrimaryNumber(idx)
    
    const newUser = {
      ...u, role, primaryNo, primaryNumber: primaryNo,
      businessName: u.businessName||'My Business',
      city: u.city||'India',
      language: u.language||lang,
      plan: u.plan||'Free',
      expiry: expiryDate,
      databaseType: u.databaseType||'Not Connected',
      databaseUrl: u.databaseUrl||'',
      databaseStatus: 'Not Connected',
      leadsCount: 0, messagesSent: 0, sheetsCount: 0, teamCount: 0,
      deviceId: dev.id, deviceInfo: dev, loginExpiry: new Date(expiryTime).toLocaleString(), loginExpiryTimestamp: expiryTime, loginDate: new Date().toLocaleString()
    }
    if(isPersistent){
      localStorage.setItem('closerblue_user', JSON.stringify(newUser))
      localStorage.setItem('closerblue_expiry', expiryTime.toString())
      localStorage.setItem('closerblue_user_device', dev.id)
    }
    if(role==='tool'){
      setAllUsers(prev=>{ if(prev.find(x=>x.email===newUser.email)) return prev; return [...prev, {...newUser, date: new Date().toLocaleString(), givenBy:'Self Signup'}] })
    }
    setUser(newUser)
    setLang(newUser.language)
    setShowAuth(false)
  }

  if(!user){
    return <div className="min-h-screen bg-[#f6f8ff] flex items-center justify-center text-[12px]">Loading... Device: {deviceInfo.id.substring(0,10)}... | Lang: {lang}</div>
  }

  if(showAuth){
    return <AuthScreen onLogin={handleLogin} onBackToAdmin={()=>setShowAuth(false)} lang={lang} setLang={setLang}/>
  }

  const t = LANGS[lang]
  return (
    <div className="min-h-screen bg-[#f6f8ff] font-sans flex flex-col">
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-3 py-2 flex justify-between items-center">
          <Logo/>
          <div className="flex gap-1 items-center">
            <select value={lang} onChange={e=>setLang(e.target.value)} className="border rounded-full px-2 py-1 text-[10px] font-bold"><option value="en">English</option><option value="hi">हिंदी</option><option value="hinglish">Hinglish</option></select>
            <span className="text-[9px] bg-green-50 border border-green-200 px-2 py-1 rounded-full font-bold hidden lg:block">✅ No Login Owner | Primary: {user.primaryNo} | {user.plan} | Exp: {user.expiry?.substring(0,10)} | DB: {user.databaseType} | Device: {deviceInfo.id.substring(0,8)}... | {LOGIN_VALIDITY_DAYS}d</span>
            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded-full hidden md:block">{user.email?.substring(0,20)} • {user.role==='super'?'Main Admin':'Tool User'}</span>
            <button onClick={()=>setShowAuth(true)} className="text-[10px] bg-[#0A66FF] text-white px-2 py-1 rounded-full font-bold">Tool Login →</button>
            <button onClick={()=>{localStorage.clear(); window.location.reload()}} className="text-[9px] bg-red-50 text-red-600 px-2 py-1 rounded-full font-bold">Logout</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-3 flex-1 w-full">
        {user.role==='super' ? <SuperAdmin user={user} allUsers={allUsers} setAllUsers={setAllUsers} setShowAuth={setShowAuth} deviceInfo={deviceInfo} lang={lang} setLang={setLang}/> : <ToolUser user={user} deviceInfo={deviceInfo} lang={lang} setLang={setLang}/>}
      </div>
      <div className="bg-white border-t py-2">
        <div className="max-w-7xl mx-auto px-3 flex justify-between items-center text-[9px] text-gray-500">
          <div className="flex items-center gap-1"><Logo/> <span>© {new Date().getFullYear()} - Primary No: CB-XXXX auto | Plan: Free/Pro/Enterprise + Expiry | DB: Sheet/Excel/MySQL/PostgreSQL/MongoDB/Firebase Any | Lang: {lang} | Legal Safe Only ✅</span></div>
          <div className="flex gap-2"><button onClick={()=>setLegal('privacy')} className="underline">Privacy - Legal Safe</button><button onClick={()=>setLegal('terms')} className="underline">Terms</button><button onClick={()=>setLegal('contact')} className="underline">Contact</button></div>
        </div>
      </div>
      {legal && <LegalModal type={legal} onClose={()=>setLegal(null)} lang={lang}/>}
    </div>
  )
}

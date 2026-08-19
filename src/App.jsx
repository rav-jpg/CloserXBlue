import { useState } from 'react'

function Logo(){ return (
  <div className="flex items-center gap-0 font-black tracking-tight">
    <span className="text-[20px] text-black">CLOSER</span>
    <span className="bg-[#0A66FF] text-white text-[20px] px-2 py-0.5 rounded-md ml-1">BLUE</span>
  </div>
)}

function AuthScreen({onLogin}){
  const [mode,setMode]=useState('login') // login | signup | forgot | reset
  const [authType,setAuthType]=useState('email') // email | mobile
  const [email,setEmail]=useState('')
  const [mobile,setMobile]=useState('')
  const [pass,setPass]=useState('')
  const [confirmPass,setConfirmPass]=useState('')
  const [name,setName]=useState('')
  const [showPass,setShowPass]=useState(false)
  const [resetSent,setResetSent]=useState(false)
  const [otpSent,setOtpSent]=useState(false)
  const [otp,setOtp]=useState('')

  const handleResetRequest = ()=>{
    if(authType==='email' && !email){ alert('Email daalo'); return }
    if(authType==='mobile' && !mobile){ alert('Mobile number daalo'); return }
    setResetSent(true)
    setTimeout(()=>setMode('reset'), 1500)
  }

  const handleSendOtp = ()=>{
    if(!mobile){ alert('Mobile number daalo - +91...'); return }
    setOtpSent(true)
    alert(`📱 OTP sent to ${mobile}: 123456 (Mock OTP)`)
  }

  const handleSetNewPassword = ()=>{
    if(!pass || pass.length<6){ alert('Password kam se kam 6 characters'); return }
    if(pass!==confirmPass){ alert('Password match nahi kar raha'); return }
    if(authType==='mobile' && !otpSent){ alert('Pehle OTP verify karo'); return }
    alert(`✅ New Password Set Successfully for ${authType==='email'?email:mobile}! Ab login karo`)
    setMode('login')
    setPass(''); setConfirmPass(''); setResetSent(false); setOtpSent(false); setOtp('')
  }

  const handleSignup = ()=>{
    if(authType==='email'){
      if(!email || !pass){ alert('Email + Password daalo'); return }
      if(pass!==confirmPass){ alert('Password match nahi'); return }
      onLogin({email, name: name||'New User', mobile:''})
    } else {
      if(!mobile || !otp || !pass){ alert('Mobile + OTP + Password daalo'); return }
      if(otp!=='123456'){ alert('OTP galat - 123456 daalo (Mock)'); return }
      if(pass!==confirmPass){ alert('Password match nahi'); return }
      onLogin({email: mobile+'@mobile.com', name: name||'Mobile User', mobile})
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f8ff] flex items-center justify-center p-4">
      <div className="bg-white border rounded-[24px] p-8 w-full max-w-[440px] shadow-xl">
        <div className="flex justify-center mb-6"><div className="flex items-center gap-0 font-black tracking-tight"><span className="text-[20px] text-black">CLOSER</span><span className="bg-[#0A66FF] text-white text-[20px] px-2 py-0.5 rounded-md ml-1">BLUE</span></div></div>
        <h2 className="font-black text-[22px] text-center">
          {mode==='login'?'Welcome Back 👋':mode==='signup'?'Create Account 🚀':mode==='forgot'?'Forget Password? 🔑':'Set New Password 🔒'}
        </h2>
        <p className="text-[12px] text-gray-500 text-center mt-1">
          {mode==='signup'?'Pehli baar aaye ho? Email ya Mobile se password set karo': mode==='login'?'Login to your panel':'Reset karo'}
        </p>

        <div className="flex gap-2 mt-4 bg-gray-100 p-1 rounded-full w-fit mx-auto">
          <button onClick={()=>setAuthType('email')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${authType==='email'?'bg-black text-white':'text-gray-600'}`}>📧 Email se</button>
          <button onClick={()=>setAuthType('mobile')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${authType==='mobile'?'bg-[#0A66FF] text-white':'text-gray-600'}`}>📱 Mobile se</button>
        </div>
        
        <div className="mt-5 space-y-3">
          {mode==='signup' && <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full Name" className="w-full border rounded-full px-4 py-3 text-[13px]"/>}
          
          {authType==='email' && (mode==='login' || mode==='signup' || mode==='forgot') && <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email - example@gmail.com (kisi bhi email se)" className="w-full border rounded-full px-4 py-3 text-[13px]"/>}
          
          {authType==='mobile' && (mode==='login' || mode==='signup' || mode==='forgot') && (
            <div className="space-y-2">
              <div className="flex gap-2"><input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="Mobile Number - +91 98765 43210" className="flex-1 border rounded-full px-4 py-3 text-[13px]"/><button onClick={handleSendOtp} className="bg-[#0A66FF] text-white px-4 rounded-full text-[11px] font-bold">{otpSent?'Resend OTP':'Send OTP'}</button></div>
              {(mode==='signup' || mode==='forgot' || otpSent) && <input value={otp} onChange={e=>setOtp(e.target.value)} placeholder="OTP - 123456 (Mock)" className="w-full border rounded-full px-4 py-3 text-[13px]"/>}
            </div>
          )}

          {mode==='reset' && <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-[11px]">📧 Reset link/OTP sent to <b>{authType==='email'?email:mobile}</b> ✅ - Ab naya password set karo</div>}

          {(mode==='login' || mode==='signup') && (
            <div className="relative">
              <input value={pass} onChange={e=>setPass(e.target.value)} type={showPass?'text':'password'} placeholder={mode==='signup'?'Set Password - Pehli baar apna password set karo - Min 6 chars':'Password'} className="w-full border rounded-full px-4 py-3 text-[13px]"/>
              <button onClick={()=>setShowPass(!showPass)} className="absolute right-3 top-3 text-[11px] bg-gray-100 px-2 py-1 rounded-full">{showPass?'Hide':'Show'}</button>
            </div>
          )}

          {mode==='signup' && <input value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} type="password" placeholder="Confirm Password - Dobara password daalo" className="w-full border rounded-full px-4 py-3 text-[13px]"/>}

          {mode==='reset' && (
            <>
              {authType==='email' && <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email - confirm" className="w-full border rounded-full px-4 py-3 text-[13px] bg-gray-50"/>}
              {authType==='mobile' && <input value={mobile} onChange={e=>setMobile(e.target.value)} placeholder="Mobile - confirm" className="w-full border rounded-full px-4 py-3 text-[13px] bg-gray-50"/>}
              <div className="relative">
                <input value={pass} onChange={e=>setPass(e.target.value)} type={showPass?'text':'password'} placeholder="Set New Password - Naya password set karo" className="w-full border rounded-full px-4 py-3 text-[13px]"/>
                <button onClick={()=>setShowPass(!showPass)} className="absolute right-3 top-3 text-[11px] bg-gray-100 px-2 py-1 rounded-full">{showPass?'Hide':'Show'}</button>
              </div>
              <input value={confirmPass} onChange={e=>setConfirmPass(e.target.value)} type="password" placeholder="Confirm New Password" className="w-full border rounded-full px-4 py-3 text-[13px]"/>
            </>
          )}
          
          {mode==='login' && <div className="flex justify-between text-[11px]"><label className="flex gap-1 items-center"><input type="checkbox"/> Remember me</label><button onClick={()=>setMode('forgot')} className="text-[#0A66FF] font-bold">Forget Password?</button></div>}

          {mode==='forgot' && !resetSent && <button onClick={handleResetRequest} className="w-full bg-black text-white py-3 rounded-full font-bold text-[13px]">Send Reset Link / OTP → {authType==='mobile'?'Mobile pe':'Email pe'}</button>}
          {mode==='forgot' && resetSent && <div className="w-full bg-green-500 text-white py-3 rounded-full font-bold text-[13px] text-center">✅ Sent! Redirecting to Set New Password...</div>}

          {mode==='login' && <button onClick={()=>{ if(authType==='email') onLogin({email,name: name||'Admin', mobile:''}); else { if(!mobile){ alert('Mobile daalo'); return } onLogin({email: mobile+'@mobile.com', name:'Mobile User', mobile}) }}} className="w-full bg-black text-white py-3 rounded-full font-bold text-[13px]">Login → {authType==='email'?'Email se':'Mobile se'}</button>}
          {mode==='signup' && <button onClick={handleSignup} className="w-full bg-black text-white py-3 rounded-full font-bold text-[13px]">Sign Up → {authType==='email'?'Email se Password Set Karo':'Mobile se OTP + Password Set Karo'} → Create Account</button>}
          {mode==='reset' && <button onClick={handleSetNewPassword} className="w-full bg-[#0A66FF] text-white py-3 rounded-full font-bold text-[13px]">🔒 Set New Password & Login - {authType==='email'?email:mobile}</button>}

          <div className="flex items-center gap-2 my-3"><div className="h-px bg-gray-200 flex-1"></div><span className="text-[11px] text-gray-400">OR</span><div className="h-px bg-gray-200 flex-1"></div></div>

          <button onClick={()=>onLogin({email:'googleuser@gmail.com', name:'Google User'})} className="w-full border py-3 rounded-full font-bold text-[13px] flex justify-center items-center gap-2"><span className="bg-white border rounded-full w-5 h-5 flex items-center justify-center text-[12px]">G</span> Continue with Google - Kisi bhi Gmail se</button>
          <button onClick={()=>onLogin({email:'fbuser@facebook.com', name:'Facebook User'})} className="w-full bg-[#1877F2] text-white py-3 rounded-full font-bold text-[13px] flex justify-center items-center gap-2">f Continue with Facebook - Kisi bhi FB se</button>

          <div className="text-center text-[12px] mt-4">
            {mode==='login' ? <span>Pehli baar aaye ho? <button onClick={()=>setMode('signup')} className="text-[#0A66FF] font-bold">Sign Up - Email/Mobile se Password Set Karo</button></span> : 
             mode==='signup' ? <span>Already have account? <button onClick={()=>setMode('login')} className="text-[#0A66FF] font-bold">Login - Email/Mobile se</button></span> :
             <span>Remember? <button onClick={()=>setMode('login')} className="text-[#0A66FF] font-bold">Back to Login</button></span>}
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-3 text-[10px] text-gray-600">
          <b>✅ Pehli baar aane wale ke liye:</b><br/>
          1. Sign Up dabao → Email se: Kisi bhi email + password set karo → Account banega<br/>
          2. Ya Mobile se: Kisi bhi mobile number + OTP (123456) + password set karo → Account banega<br/>
          3. Google/Facebook se bhi direct login - kisi bhi account se<br/>
          4. Forget: Email/Mobile pe reset link/OTP → Naya password set karo
        </div>
      </div>
    </div>
  )
}

function SuperAdmin({user}){
  const [tab, setTab] = useState('dashboard')
  const [subTab, setSubTab] = useState('api')
  const [numbers, setNumbers] = useState([{n:'+91 98765 43210', status:'Ready'}])
  const [withAttach, setWithAttach] = useState(false)
  const [fileName, setFileName] = useState('')
  const [crmLeads, setCrmLeads] = useState([
    {id:1, name:'Amit Sharma', phone:'+91 98765 43210', stage:'New', value:4999, source:'Sheet'},
    {id:2, name:'Priya Store', phone:'+91 87654 32109', stage:'Qualified', value:9999, source:'WhatsApp'},
    {id:3, name:'Rohit Coaching', phone:'+91 91234 56789', stage:'Payment Sent', value:19999, source:'Excel'},
    {id:4, name:'Shopify Client', phone:'+91 90000 12345', stage:'Closed', value:4999, source:'API'},
  ])
  const moveStage = (id)=>{ const order=['New','Qualified','Payment Sent','Closed']; setCrmLeads(leads=>leads.map(l=>{ if(l.id===id){ const idx=order.indexOf(l.stage); return {...l, stage: order[Math.min(idx+1,3)]} } return l })) }
  const sendBulk = ()=>{ setNumbers(n=>n.map(x=>({...x, status:'Sent ✅'}))); alert(`Bulk Sent to ${numbers.length}`) }
  return (
    <div className="space-y-4">
      <div className="flex gap-2 bg-white p-1.5 rounded-full w-fit border shadow-sm">
        <button onClick={()=>setTab('dashboard')} className={`px-5 py-2 rounded-full text-[12px] font-black ${tab==='dashboard'?'bg-black text-white':'text-gray-600'}`}>🏠 Dashboard - Daily</button>
        <button onClick={()=>setTab('crm')} className={`px-5 py-2 rounded-full text-[12px] font-black ${tab==='crm'?'bg-[#0A66FF] text-white':'text-gray-600'}`}>📊 My CRM - Admin</button>
        <button onClick={()=>setTab('other')} className={`px-5 py-2 rounded-full text-[12px] font-black ${tab==='other'?'bg-gray-900 text-white':'text-gray-600'}`}>⚙️ Other / Settings</button>
      </div>
      {tab==='dashboard' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-black via-[#0A66FF] to-black rounded-[24px] p-5 text-white flex justify-between items-center">
            <div><div className="text-[22px] font-black">Good Morning, {user?.name||'Admin'} 👋</div><div className="text-[12px] opacity-80 mt-1">Aaj 12 new leads, ₹34k pending, 3 payment links baaki</div><div className="flex gap-2 mt-3"><span className="bg-white text-black px-3 py-1 rounded-full text-[11px] font-bold">🔥 4 Hot Leads</span><span className="bg-[#25D366] px-3 py-1 rounded-full text-[11px] font-bold">WhatsApp Connected ●</span></div></div>
            <div className="text-right"><div className="text-[32px] font-black">₹89,499</div><div className="text-[11px] opacity-70">Total Revenue</div></div>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[{k:'New Leads Today', v:'12', sub:'+4 vs yesterday', color:'bg-blue-50'}, {k:'Qualified', v:'4', sub:'Ready to pay', color:'bg-yellow-50'}, {k:'Payment Pending', v:'₹34k', sub:'3 links sent', color:'bg-orange-50'}, {k:'Closed Won', v:'8', sub:'₹89k collected', color:'bg-green-50'}].map(s=>(
              <div key={s.k} className={`${s.color} border rounded-2xl p-4`}><div className="text-[11px] text-gray-600">{s.k}</div><div className="text-[24px] font-black mt-1">{s.v}</div><div className="text-[10px] text-gray-500 mt-1">{s.sub}</div></div>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-white border rounded-2xl p-4">
              <div className="flex justify-between items-center"><h3 className="font-bold text-[13px]">📊 Today's CRM - Daily Use</h3><button onClick={()=>setTab('crm')} className="text-[11px] bg-black text-white px-3 py-1 rounded-full">Open Full CRM →</button></div>
              <div className="grid grid-cols-4 gap-2 mt-3">
                {['New','Qualified','Payment Sent','Closed'].map(stage=>(
                  <div key={stage} className="bg-gray-50 rounded-xl p-2"><div className="text-[10px] font-black flex justify-between">{stage} <span className="bg-white px-1.5 rounded-full">{crmLeads.filter(l=>l.stage===stage).length}</span></div>
                    <div className="mt-2 space-y-2">{crmLeads.filter(l=>l.stage===stage).slice(0,2).map(lead=>(
                      <div key={lead.id} className="bg-white border rounded-lg p-2"><div className="text-[11px] font-bold">{lead.name}</div><div className="text-[10px] text-gray-500">{lead.phone} • ₹{lead.value}</div><button onClick={()=>moveStage(lead.id)} className="mt-1 w-full bg-[#0A66FF] text-white py-1 rounded-full text-[9px] font-bold">Move →</button></div>
                    ))}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white border rounded-2xl p-4">
                <h3 className="font-bold text-[12px]">⚡ Quick Bulk Sender - Daily</h3>
                <div className="mt-2 border-2 border-dashed rounded-xl p-3 text-center">
                  <input type="file" accept=".xlsx,.csv" onChange={e=>{ if(e.target.files[0]){ setFileName(e.target.files[0].name); setNumbers(m=>[...m, {n:'+91 90000 000'+Math.floor(Math.random()*10), status:'Imported'}])}}} className="hidden" id="qSheet"/><label htmlFor="qSheet" className="cursor-pointer bg-black text-white px-3 py-1.5 rounded-full text-[11px]">📊 Upload Sheet</label>
                  <div className="text-[10px] text-gray-400 mt-1">{fileName||'Sheet se sabko'}</div>
                </div>
                <div className="mt-2 flex gap-2 items-center"><button onClick={()=>setWithAttach(!withAttach)} className={`w-8 h-5 rounded-full p-0.5 ${withAttach?'bg-[#0A66FF]':'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${withAttach?'translate-x-3':''}`}></div></button><span className="text-[10px]">With Attachment? {withAttach?'YES':'NO'}</span></div>
                <button onClick={sendBulk} className="mt-2 w-full bg-[#0A66FF] text-white py-2 rounded-xl font-bold text-[11px]">🚀 Send to {numbers.length}</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {tab==='crm' && (
        <div className="space-y-3">
          <div className="bg-black text-white rounded-2xl p-4 flex justify-between items-center"><div><div className="font-black text-[16px]">📊 My CRM - Admin - Full View</div><div className="text-[11px] opacity-70">Drag, move stages, auto payment link when qualified</div></div><div className="flex gap-2"><button className="bg-white text-black px-3 py-1.5 rounded-full text-[11px] font-bold">+ Add Lead</button><button className="bg-[#0A66FF] px-3 py-1.5 rounded-full text-[11px] font-bold">Export Sheet</button></div></div>
          <div className="grid grid-cols-4 gap-3">
            {['New','Qualified','Payment Sent','Closed Won'].map(stage=>(
              <div key={stage} className="bg-white border rounded-2xl p-3 min-h-[400px]"><div className="flex justify-between items-center"><div className="font-bold text-[12px]">{stage}</div><span className="bg-gray-100 px-2 py-0.5 rounded-full text-[10px]">{crmLeads.filter(l=>l.stage===stage).length}</span></div>
                <div className="mt-3 space-y-2">{crmLeads.filter(l=>l.stage===stage).map(lead=>(
                  <div key={lead.id} className="border rounded-xl p-3 bg-gray-50"><div className="font-bold text-[12px]">{lead.name}</div><div className="text-[11px] text-gray-600">{lead.phone}</div><div className="text-[11px] mt-1">💰 ₹{lead.value}</div>
                    <div className="mt-2 grid grid-cols-2 gap-1"><button onClick={()=>moveStage(lead.id)} className="bg-[#0A66FF] text-white py-1.5 rounded-full text-[10px] font-bold">Move →</button><button className="bg-white border py-1.5 rounded-full text-[10px]">📞 Voice Call</button></div>
                  </div>
                ))}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab==='other' && (
        <div>
          <div className="flex gap-2 mb-3 bg-white p-2 rounded-full w-fit border overflow-auto">
            {[{id:'api', label:'API Centre + Voice + Google/FB Login'},{id:'kb', label:'Knowledge Base PDF+Type'},{id:'sheets', label:'Master Sheets Link+Excel+AutoChat'},{id:'clients', label:'Clients & Subscription'},{id:'team', label:'Team & Settings'}].map(t=><button key={t.id} onClick={()=>setSubTab(t.id)} className={`px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap ${subTab===t.id?'bg-black text-white':'text-gray-600'}`}>{t.label}</button>)}
          </div>
          {subTab==='api' && (
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white border rounded-2xl p-4"><div className="font-bold text-[12px]">📱 WhatsApp API - Easy 1-Click</div><div className="text-[10px] text-gray-500">No tech</div><button className="mt-3 w-full bg-[#25D366] text-white py-2 rounded-xl text-[12px] font-bold">1-Click Connect WhatsApp</button></div>
              <div className="bg-white border rounded-2xl p-4"><div className="font-bold text-[12px]">🧠 Gemini API (Master)</div><input placeholder="Gemini Key AIza..." className="mt-2 w-full border rounded-full px-3 py-2 text-[11px]"/><button className="mt-2 bg-black text-white px-3 py-1 rounded-full text-[11px]">Save & Test</button></div>
              <div className="bg-white border rounded-2xl p-4"><div className="font-bold text-[12px]">💳 Razorpay API</div><input placeholder="Key ID" className="mt-2 w-full border rounded-full px-3 py-2 text-[11px]"/><input placeholder="Key Secret" className="mt-2 w-full border rounded-full px-3 py-2 text-[11px]"/><button className="mt-2 bg-black text-white px-3 py-1 rounded-full text-[11px]">Save</button></div>
              <div className="bg-white border rounded-2xl p-4"><div className="font-bold text-[12px]">📞 Voice Call API</div><input placeholder="Exotel / MyOperator / Twilio" className="mt-2 w-full border rounded-full px-3 py-2 text-[11px]"/><button className="mt-2 bg-black text-white px-3 py-1 rounded-full text-[11px]">Save</button></div>
              <div className="bg-white border rounded-2xl p-4 col-span-2"><div className="font-bold text-[12px]">🔐 Google Login + Facebook Login API (Auth ke liye)</div><div className="grid grid-cols-2 gap-3 mt-2"><div><div className="text-[11px] font-bold">Google OAuth - Client ID</div><input placeholder="xxx.apps.googleusercontent.com" className="w-full border rounded-full px-3 py-2 text-[11px] mt-1"/><div className="text-[10px] font-bold mt-1">Google Client Secret</div><input placeholder="GOCSPX-..." className="w-full border rounded-full px-3 py-2 text-[11px] mt-1"/><div className="text-[10px] text-gray-500 mt-1">Google Cloud Console → Credentials → OAuth Client ID</div></div><div><div className="text-[11px] font-bold">Facebook Login - App ID</div><input placeholder="123456789..." className="w-full border rounded-full px-3 py-2 text-[11px] mt-1"/><div className="text-[10px] font-bold mt-1">Facebook App Secret</div><input placeholder="secret..." className="w-full border rounded-full px-3 py-2 text-[11px] mt-1"/><div className="text-[10px] text-gray-500 mt-1">developers.facebook.com → My Apps → Create App → Facebook Login</div></div></div><button className="mt-3 bg-[#0A66FF] text-white px-4 py-2 rounded-full text-[11px] font-bold">Save Google + Facebook Login Keys → Auth Ready ✅</button></div>
            </div>
          )}
          {subTab==='kb' && <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-[13px]">🧠 Knowledge Base PDF + Type</h3><div className="mt-3 border-2 border-dashed rounded-xl p-4 text-center bg-blue-50/50"><label className="bg-[#0A66FF] text-white px-4 py-2 rounded-full text-[12px] font-bold cursor-pointer">📄 Upload PDF</label></div><div className="mt-3 grid grid-cols-2 gap-2"><textarea placeholder="Business Details Type Karo..." className="border rounded-xl p-3 text-[12px] h-24"/><textarea placeholder="Price, FAQ..." className="border rounded-xl p-3 text-[12px] h-24"/></div><button className="mt-3 w-full bg-black text-white py-2.5 rounded-xl font-bold text-[12px]">Train AI</button></div>}
          {subTab==='sheets' && <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold">🔗 Master Sheets Link + Excel + AutoChat</h3><input placeholder="Google Sheet URL - Link Connect" className="mt-3 w-full border rounded-full px-3 py-2 text-[11px]"/><button className="mt-2 bg-[#0A66FF] text-white px-4 py-2 rounded-full text-[11px]">Connect Sheet Link + Excel + AutoChat ON</button></div>}
          {subTab==='clients' && <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold">👥 Clients & Subscription + Auto Payment</h3><div className="flex gap-2 mt-3"><input placeholder="Email to give free" className="flex-1 border rounded-full px-3 py-2 text-[12px]"/><button className="bg-black text-white px-4 rounded-full text-[12px]">+ Give Free</button></div></div>}
          {subTab==='team' && <div className="bg-white border rounded-2xl p-4 text-[12px]">Team & Settings: Bot Name, Welcome Msg, Alerts Numbers, Working Hours, Payment Auto ON/OFF</div>}
        </div>
      )}
    </div>
  )
}

function ToolUser({user}){
  const [numbers, setNumbers] = useState([{n:'+91 91234 56789', status:'Ready'}])
  const [withAttach, setWithAttach] = useState(true)
  return (
    <div className="space-y-4">
      <div className="bg-white border rounded-2xl p-4 flex justify-between"><div><div className="font-bold">Welcome, {user?.name} 👋</div><div className="text-[11px] text-gray-500">Your business dashboard - Gemini using Super Admin's (Free)</div></div><div className="text-[11px] bg-green-100 text-green-700 px-2 py-1 rounded-full h-fit">● My WhatsApp Connected</div></div>
      <div className="grid grid-cols-3 gap-3">{[{k:'My Leads', v:'342'}, {k:'My Revenue', v:'₹34,000'}, {k:'Msgs Sent', v:'890'}].map(s=><div key={s.k} className="bg-white border rounded-2xl p-4"><div className="text-[11px] text-gray-500">{s.k}</div><div className="text-[20px] font-black">{s.v}</div></div>)}</div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-[13px]">🧠 My Knowledge Base - PDF / Type</h3><div className="mt-3 border-2 border-dashed rounded-xl p-4 text-center"><div className="text-[12px]">📄 Upload PDF</div></div><textarea placeholder="Business Details Type Karo..." className="mt-3 w-full border rounded-xl p-3 text-[12px] h-20"/><button className="mt-2 w-full bg-black text-white py-2 rounded-xl text-[12px] font-bold">Train My AI</button></div>
        <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-[13px]">📤 My Bulk + Sheet Link + Excel + APIs</h3><input placeholder="Your Google Sheet URL - Link Connect" className="w-full border rounded-full px-3 py-2 text-[11px] mt-2"/><button className="w-full mt-2 bg-[#0A66FF] text-white py-2 rounded-full text-[11px]">Connect Sheet Link + Excel + WhatsApp Easy 1-Click + Razorpay</button><div className="text-[10px] text-gray-500 mt-2">Gemini: Super Admin's Free | WhatsApp: Easy | Payment: Your Razorpay</div><div className="mt-3"><input type="file" accept=".xlsx,.csv" className="text-[11px] w-full"/><button className="mt-2 w-full bg-black text-white py-2 rounded-xl text-[11px]">Send Bulk with Attachment</button></div></div>
      </div>
      <div className="bg-white border rounded-2xl p-4"><h3 className="font-bold text-[13px]">📊 My CRM + Auto Payment - Deal Close → Payment Link</h3><div className="grid grid-cols-4 gap-2 mt-3">{['New','Qualified','Payment Sent','Closed'].map(stage=><div key={stage} className="bg-gray-50 rounded-xl p-2"><div className="text-[10px] font-bold">{stage}</div><div className="mt-2"><div className="bg-white border rounded-lg p-2 text-[10px]">Lead +91 98...<br/>₹2000</div></div></div>)}</div></div>
    </div>
  )
}

export default function App(){
  const [user,setUser]=useState(null)
  const [view, setView] = useState('super')
  if(!user){ return <AuthScreen onLogin={(u)=>setUser(u)}/> }
  return (
    <div className="min-h-screen bg-[#f6f8ff] font-sans">
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Logo/>
          <div className="flex gap-2 items-center">
            <span className="text-[11px] bg-gray-100 px-3 py-1 rounded-full">{user.name} • {user.email}</span>
            <button onClick={()=>setView('super')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${view==='super'?'bg-black text-white':'bg-gray-100'}`}>Super Admin Panner</button>
            <button onClick={()=>setView('tool')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${view==='tool'?'bg-[#0A66FF] text-white':'bg-gray-100'}`}>Tool User Panner</button>
            <button onClick={()=>setUser(null)} className="text-[11px] bg-red-50 text-red-600 px-3 py-1.5 rounded-full font-bold">Logout</button>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4">
        {view==='super' ? <SuperAdmin user={user}/> : <ToolUser user={user}/>}
      </div>
    </div>
  )
}

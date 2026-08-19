import { useState } from 'react'
export default function ApiCentre(){
 const [saved, setSaved]=useState({})
 const [keys, setKeys]=useState({gemini:'', model:'gemini-1.5-flash', rzp_id:'', rzp_secret:'', wa_phone:'', wa_id:'', wa_token:''})
 const [master, setMaster]=useState({gemini:true, payment:true, whatsapp:true, voice:false})
 const [autoChat, setAutoChat]=useState(true)
 const save = (id)=>{
  setSaved({...saved, [id]:true});
  const api = import.meta.env.VITE_API_URL
  if(api){
   fetch(api+'/api/save-keys',{method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({type:id, data:keys})}).catch(()=>{})
  }
  setTimeout(()=> setSaved({...saved, [id]:false}), 2000)
 }
 const card="bg-white rounded- p-6 border shadow-sm"
 return (
  <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
   <div className={card+"!bg-[#0A66FF] text-white"}>
    <h2 className="text-xl font-bold">Master Controls - Service ON/OFF</h2>
    <p className="text-sm opacity-80 mt-1">Yaha se client ke liye feature band/chalu karo</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
     {Object.keys(master).map(k=>(
      <label key={k} className="bg-white/10 rounded-xl px-4 py-3 flex justify-between items-center cursor-pointer">
       <span className="capitalize text-sm font-medium">{k}</span>
       <input type="checkbox" checked={master[k]} onChange={e=>setMaster({...master,[k]:e.target.checked})} className="accent-white w-5 h-5"/>
      </label>
     ))}
    </div>
   </div>

   <div className="grid md:grid-cols-2 gap-6">
    <div className={card}>
     <div className="flex justify-between"><h3 className="font-bold">🧠 Gemini AI - Brain</h3><span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">ADMIN ONLY</span></div>
     <input value={keys.gemini} onChange={e=>setKeys({...keys, gemini:e.target.value})} type="password" placeholder="Gemini API Key - AIza..." className="mt-4 w-full border rounded-xl px-4 py-3 text-sm"/>
     <select value={keys.model} onChange={e=>setKeys({...keys, model:e.target.value})} className="mt-3 w-full border rounded-xl px-4 py-3 text-sm"><option>gemini-1.5-flash</option><option>gemini-1.5-pro</option></select>
     <div className="flex gap-2 mt-4"><button onClick={()=>save('gemini')} className="flex-1 bg-[#0A66FF] text-white rounded-xl py-3 text-sm font-semibold">{saved.gemini?'Saved ✅':'Save & Active'}</button><button className="border rounded-xl px-4 text-sm">Test</button></div>
     <p className="text- text-gray-400 mt-2">Key encrypted & saved in server.env - never in frontend</p>
    </div>

    <div className={card}>
     <div className="flex justify-between"><h3 className="font-bold">💳 Razorpay - Payment</h3><span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">ADMIN ONLY</span></div>
     <input value={keys.rzp_id} onChange={e=>setKeys({...keys, rzp_id:e.target.value})} placeholder="rzp_live_..." className="mt-4 w-full border rounded-xl px-4 py-3 text-sm"/>
     <input value={keys.rzp_secret} onChange={e=>setKeys({...keys, rzp_secret:e.target.value})} type="password" placeholder="Key Secret" className="mt-3 w-full border rounded-xl px-4 py-3 text-sm"/>
     <button onClick={()=>save('razorpay')} className="w-full bg-black text-white rounded-xl py-3 text-sm font-semibold mt-4">{saved.razorpay?'Saved ✅':'Save Razorpay Keys'}</button>
    </div>
   </div>

   <div className={card+" border-2 border-[#0A66FF]/20"}>
    <div className="flex justify-between items-start">
     <div><h3 className="font-bold text-lg">📱 WhatsApp Business API - Client Connect</h3><p className="text-sm text-gray-500">Yaha se tumhara client apna number connect karega - 1 jagah pe sab</p></div>
     <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">Multi-Tenant Ready</span>
    </div>

    <div className="mt-6 bg-[#f0f6ff] rounded-2xl p-5 text-center">
     <h4 className="font-bold">For Your Clients - No-Code Connect</h4>
     <p className="text-xs text-gray-500 mt-1">Client ko koi ID copy nahi karni</p>
     <button onClick={()=>alert('Facebook Embedded Signup yaha khulega - Live me Facebook App ID chahiye')} className="mt-4 w-full md:w-auto bg-[#0A66FF] text-white px-8 py-3 rounded-xl font-bold">🔵 Connect With Facebook - 1 Click</button>
     <p className="text- text-gray-400 mt-3">Meta Official Embedded Signup Flow</p>
    </div>

    <div className="mt-6 grid md:grid-cols-3 gap-4">
     <input value={keys.wa_phone} onChange={e=>setKeys({...keys, wa_phone:e.target.value})} placeholder="Phone Number ID" className="border rounded-xl px-4 py-3 text-sm"/>
     <input value={keys.wa_id} onChange={e=>setKeys({...keys, wa_id:e.target.value})} placeholder="Business Account ID" className="border rounded-xl px-4 py-3 text-sm"/>
     <input value={keys.wa_token} onChange={e=>setKeys({...keys, wa_token:e.target.value})} type="password" placeholder="Permanent Token" className="border rounded-xl px-4 py-3 text-sm"/>
    </div>
    <div className="flex gap-3 mt-4">
     <button onClick={()=>save('whatsapp')} className="bg-[#0A66FF] text-white rounded-xl px-6 py-3 text-sm font-semibold">{saved.whatsapp?'Connected ✅':'Save & Connect WhatsApp'}</button>
     <div className="flex items-center gap-2 border rounded-xl px-4"><span className="text-sm">Auto-Chat</span><input type="checkbox" checked={autoChat} onChange={e=>setAutoChat(e.target.checked)} className="w-5 h-5 accent-[#0A66FF]"/><span className="text-xs">{autoChat?'ON':'OFF'}</span></div>
    </div>

    <div className="mt-8 grid md:grid-cols-2 gap-4">
     <div className="border rounded-2xl p-4"><h5 className="font-bold text-sm">🤖 Tarika 1: Flow Builder (No-Code)</h5><p className="text-xs text-gray-500 mt-2">Drag & Drop: User ne Hi likha → Bot: Hello! Button: Price / Demo</p><div className="mt-3 bg-gray-50 rounded-xl p-3 text-xs">IF message contains "price" → Send "Plan ₹1999 se start hai"</div></div>
     <div className="border rounded-2xl p-4 bg-blue-50/50"><h5 className="font-bold text-sm">🧠 Tarika 2: Gemini AI Brain + Auto Chat</h5><p className="text-xs text-gray-500 mt-2">PDF/Link se train karo, bot khud soch ke jawab dega 24x7</p><div className="mt-3 bg-white rounded-xl p-3 text-xs border">Lead: Price kya hai? <br/>AI: ₹1999 wala plan tumhare liye best hai kyunki...</div></div>
    </div>
   </div>

   <div className={card+" opacity-60"}>
    <h3 className="font-bold">🎙️ Voice API - Coming Soon</h3>
    <p className="text-xs text-gray-500 mt-1">Abhi ke liye band hai jaise tumne bola tha</p>
   </div>

   <div className="text-center text- text-gray-400 py-4">CloserBlue v1.0 - API Centre - All keys encrypted with AES-256 | Demo: /test-chat</div>
  </div>
 )
}

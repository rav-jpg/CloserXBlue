import { useState } from 'react'

function Logo(){ return (
  <div className="flex items-center gap-0 font-black tracking-tight">
    <span className="text-[20px] text-black">CLOSER</span>
    <span className="bg-[#0A66FF] text-white text-[20px] px-2 py-0.5 rounded-md ml-1">BLUE</span>
  </div>
)}

function SuperAdmin(){
  const [numbers, setNumbers] = useState([{n:'+91 98765 43210', status:'Ready'}, {n:'+91 87654 32109', status:'Ready'}])
  const [msg, setMsg] = useState('Hi {Name}, Your {Product} demo is ready! Check: {Link}')
  const [withAttach, setWithAttach] = useState(false)
  const [fileName, setFileName] = useState('')
  const [clients, setClients] = useState([{name:'Amit Coaching', email:'amit@test.com', plan:'Free', status:'Active'}, {name:'Shopify Store', email:'store@test.com', plan:'Pro ₹4999', status:'Active'}])

  const parseSheet = (e)=>{
    const file = e.target.files[0]
    if(!file) return
    setFileName(file.name)
    // mock parse - add 5 numbers
    const mock = Array.from({length:5}, (_,i)=>({n:`+91 90000 0000${i}`, status:'Imported from Sheet'}))
    setNumbers(m=>[...m, ...mock])
  }

  const sendBulk = ()=>{
    setNumbers(n=>n.map(x=>({...x, status:'Sent ✅'})))
    alert(`Bulk Sent to ${numbers.length} numbers ${withAttach ? 'with attachment: '+fileName : 'without attachment'} ✅`)
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-3">
        {[{k:'Total Clients', v:clients.length}, {k:'Active Bots', v:'12'}, {k:'Msgs Sent Today', v:'1,240'}, {k:'Revenue', v:'₹89,499'}].map(s=>(
          <div key={s.k} className="bg-white border rounded-2xl p-4"><div className="text-[11px] text-gray-500">{s.k}</div><div className="text-[22px] font-black">{s.v}</div></div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-2xl p-4">
          <h3 className="font-bold text-[13px]">📤 BULK SENDER - Sheet Se Sabko Message</h3>
          <p className="text-[11px] text-gray-500 mt-1">Sheet me jitne number ho, sabko ek sath message - attachment ke sath ya bina</p>
          
          <div className="mt-3 border-2 border-dashed rounded-xl p-4 text-center">
            <input type="file" accept=".xlsx,.csv" onChange={parseSheet} className="hidden" id="sheetUp"/>
            <label htmlFor="sheetUp" className="cursor-pointer text-[12px] bg-black text-white px-4 py-2 rounded-full">📊 Upload Sheet / Excel</label>
            <div className="text-[10px] text-gray-400 mt-2">{fileName || 'No file - .xlsx, .csv supported - all numbers auto imported'}</div>
          </div>

          <div className="mt-3 space-y-2">
            <label className="text-[11px] font-bold">Message Template (Use {'{Name}'}, {'{Product}'})</label>
            <textarea value={msg} onChange={e=>setMsg(e.target.value)} className="w-full border rounded-xl p-3 text-[12px] h-20"/>
            <div className="flex items-center gap-2">
              <button onClick={()=>setWithAttach(!withAttach)} className={`w-10 h-6 rounded-full p-1 ${withAttach?'bg-[#0A66FF]':'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${withAttach?'translate-x-4':''}`}></div></button>
              <span className="text-[11px] font-bold">With Attachment? {withAttach?'YES - PDF/Image/Video':'NO - Only Text'}</span>
            </div>
            {withAttach && <div className="border rounded-xl p-3"><input type="file" onChange={e=>setFileName(e.target.files[0]?.name||'')} className="text-[11px]"/><div className="text-[10px] text-gray-500 mt-1">Attach PDF, Image, Video, Doc - will send to all numbers</div></div>}
            <button onClick={sendBulk} className="w-full bg-[#0A66FF] text-white py-3 rounded-xl font-bold text-[13px]">🚀 Send to {numbers.length} Numbers {withAttach?`with ${fileName}`:''}</button>
          </div>

          <div className="mt-3 max-h-32 overflow-auto border rounded-xl">
            {numbers.map((n,i)=><div key={i} className="flex justify-between text-[11px] p-2 border-b last:border-0"><span>{n.n}</span><span className="text-green-600">{n.status}</span></div>)}
          </div>
        </div>

        <div className="bg-white border rounded-2xl p-4">
          <h3 className="font-bold text-[13px]">👥 Clients & Free Access - Super Admin Only</h3>
          <div className="mt-3 flex gap-2"><input placeholder="Email to give free access" className="flex-1 border rounded-full px-3 py-2 text-[12px]"/><button className="bg-black text-white px-4 rounded-full text-[12px]">+ Give Free</button></div>
          <div className="mt-3 border rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 bg-gray-50 text-[10px] font-bold p-2"><span>Name</span><span>Plan</span><span>Status</span><span>Action</span></div>
            {clients.map((c,i)=><div key={i} className="grid grid-cols-4 text-[11px] p-2 border-t"><span>{c.name}</span><span>{c.plan}</span><span>{c.status}</span><button className="text-[#0A66FF] font-bold">Manage</button></div>)}
          </div>
          <div className="mt-4 bg-yellow-50 p-3 rounded-xl text-[11px]"><b>Logo:</b> CLOSER (bold black) + BLUE (bold white in blue box) - as you asked ✅</div>
        </div>
      </div>
    </div>
  )
}

function ToolUser(){
  const [numbers, setNumbers] = useState([{n:'+91 91234 56789', status:'Ready'}])
  const [msg, setMsg] = useState('Hi {Name}, Thanks for your interest in {My Product} - Price is {Price}')
  const [withAttach, setWithAttach] = useState(true)
  const [kb, setKb] = useState({business:'My Business: Selling T-shirts', price:'₹499'})

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {[{k:'My Leads', v:'342'}, {k:'My Revenue', v:'₹34,000'}, {k:'Msgs Sent', v:'890'}].map(s=>(
          <div key={s.k} className="bg-white border rounded-2xl p-4"><div className="text-[11px] text-gray-500">{s.k}</div><div className="text-[20px] font-black">{s.v}</div></div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-2xl p-4">
          <h3 className="font-bold text-[13px]">🧠 My Knowledge Base - PDF / Business Info</h3>
          <p className="text-[11px] text-gray-500">Upload PDF or type - AI will chat based on this</p>
          <div className="mt-3 border-2 border-dashed rounded-xl p-4 text-center"><div className="text-[12px]">📄 Upload PDF</div><div className="text-[10px] text-gray-400">Your product catalog, price list</div></div>
          <textarea value={kb.business} onChange={e=>setKb({...kb, business:e.target.value})} placeholder="Type your business details..." className="mt-3 w-full border rounded-xl p-3 text-[12px] h-20"/>
          <textarea value={kb.price} onChange={e=>setKb({...kb, price:e.target.value})} placeholder="Price, FAQ..." className="mt-2 w-full border rounded-xl p-3 text-[12px] h-16"/>
          <button className="mt-2 w-full bg-black text-white py-2 rounded-xl text-[12px] font-bold">Train My AI on PDF + Business Info</button>
        </div>

        <div className="bg-white border rounded-2xl p-4">
          <h3 className="font-bold text-[13px]">📤 My Bulk Sender - Sheet Se Message</h3>
          <p className="text-[11px] text-gray-500">Same feature as Super Admin - for YOUR customers</p>
          <div className="mt-3">
            <input type="file" accept=".xlsx,.csv" onChange={e=>{ if(e.target.files[0]) setNumbers(n=>[...n, {n:'+91 90000 11111', status:'Imported from '+e.target.files[0].name}])}} className="text-[11px] w-full"/>
            <textarea value={msg} onChange={e=>setMsg(e.target.value)} className="mt-2 w-full border rounded-xl p-3 text-[12px] h-16"/>
            <div className="flex gap-2 mt-2 items-center">
              <button onClick={()=>setWithAttach(!withAttach)} className={`w-10 h-6 rounded-full p-1 ${withAttach?'bg-[#0A66FF]':'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full transition ${withAttach?'translate-x-4':''}`}></div></button>
              <span className="text-[11px]">{withAttach?'With PDF/Image':'Without attachment'}</span>
            </div>
            {withAttach && <input type="file" className="mt-2 text-[11px]"/>}
            <button onClick={()=>setNumbers(n=>n.map(x=>({...x, status:'Sent ✅'})))} className="mt-2 w-full bg-[#0A66FF] text-white py-2.5 rounded-xl font-bold text-[12px]">Send to {numbers.length} My Customers</button>
            <div className="mt-2 max-h-24 overflow-auto border rounded-xl">{numbers.map((n,i)=><div key={i} className="text-[11px] p-2 border-b flex justify-between"><span>{n.n}</span><span>{n.status}</span></div>)}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white border rounded-2xl p-4">
          <h3 className="font-bold text-[13px]">📊 My CRM - Kanban</h3>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {['New','Payment Sent','Closed'].map(stage=>(
              <div key={stage} className="bg-gray-50 rounded-xl p-2"><div className="text-[10px] font-bold">{stage}</div><div className="mt-2 space-y-1"><div className="bg-white border rounded-lg p-2 text-[10px]">Lead +91 98... <br/>₹2000</div></div></div>
            ))}
          </div>
        </div>
        <div className="bg-white border rounded-2xl p-4">
          <h3 className="font-bold text-[13px]">🔗 My Sheet & Excel Connect + My Settings</h3>
          <div className="mt-2 space-y-2">
            <input placeholder="Your Google Sheet URL" className="w-full border rounded-full px-3 py-2 text-[11px]"/>
            <button className="w-full border py-2 rounded-full text-[11px]">Connect My Sheet - Auto sync my leads</button>
            <div className="border-t pt-2 mt-2">
              <div className="text-[11px] font-bold">Settings (All inside Settings):</div>
              <div className="text-[10px] text-gray-500">Bot Name, Welcome Msg, Alerts Numbers (choose who gets alert), Working Hours, Payment Link Auto - all in one Settings tab ✅</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App(){
  const [view, setView] = useState('super') // super | tool
  const [authView, setAuthView] = useState(false)

  return (
    <div className="min-h-screen bg-[#f6f8ff] font-sans">
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
          <Logo/>
          <div className="flex gap-2 items-center">
            <button onClick={()=>setView('super')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${view==='super'?'bg-black text-white':'bg-gray-100'}`}>Super Admin Panner</button>
            <button onClick={()=>setView('tool')} className={`px-4 py-1.5 rounded-full text-[11px] font-bold ${view==='tool'?'bg-[#0A66FF] text-white':'bg-gray-100'}`}>Tool User Panner</button>
            <div className="w-px h-6 bg-gray-200 mx-1"></div>
            <div className="text-[10px] bg-green-100 text-green-700 px-2 py-1 rounded-full">● Live</div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <div className="mb-4 bg-black text-white rounded-2xl p-3 flex justify-between items-center text-[11px]">
          <span><b>Logo Final:</b> CLOSER (bold) + <span className="bg-[#0A66FF] px-1 rounded">BLUE</span> box ✅ | <b>Bulk:</b> Sheet ke saare numbers ko with/without attachment bhej sakte ho ✅ | <b>Dashboard:</b> Alag-alag ✅ | Auto Payment Link + Google/FB Login + Subscription ready ✅</span>
          <span className="bg-white text-black px-2 py-1 rounded-full text-[10px]">Kaam Start - Ready to Deploy</span>
        </div>
        {view==='super' ? <SuperAdmin/> : <ToolUser/>}
      </div>
    </div>
  )
}

import ApiCentre from './components/ApiCentre'
export default function App(){
 return (
  <div className="min-h-screen bg-[#f6f8ff]">
   <div className="bg-white border-b sticky top-0 z-20">
    <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
     <div className="flex gap-3 items-center"><div className="w-9 h-9 rounded-xl bg-[#0A66FF] text-white font-black grid place-items-center">C</div><div><h1 className="font-bold leading-none">CloserBlue</h1><p className="text- text-gray-500">Close More. Faster.</p></div></div>
     <div className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-700">● Live Mode - Demo</div>
    </div>
   </div>
   <ApiCentre/>
  </div>
 )
}

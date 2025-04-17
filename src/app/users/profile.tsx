import React from "react";

export default function MyPage() {



  return(
    <div className="w-[948px] h-[456px] flex justify-center items-center">
      <div>
        <button className="w-[120px] h-[120px] rounded-full relative" style={{background:'var(--gray-01)'}}>
          <img />
            <label  className="cursor-pointer w-[32px] h-[32px] rounded-full flex justify-center items-center absolute left-[86px] top-[81px]" style={{background: 'var(--gray-02)'}}>
              <img src="image/Edit.svg" />
              <input type="file" className="hidden" accept="image/*"></input>
            </label>
        </button>
        <div>
          
        </div>
      </div>
    </div>
  ) 
}
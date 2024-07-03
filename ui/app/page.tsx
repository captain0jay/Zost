// import Image from "next/image";

import ConfigSection from "./(components)/ConfigSection";
import Pagespreview from "./(components)/Pagespreview";
import Toolbar from "./(components)/Toolbar";
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  return (
    <div className="w-full h-full">
      <div className="grid grid-cols-8 gap-2 h-full">
        {/* the pages preview section */}
        <div className="col-span-1">
          <div className="w-full h-full bg-gray-50 rounded-xl">
            <Pagespreview/>
          </div>
        </div>

        {/* the main section */}
        <div className="col-span-7">
          <div className="grid grid-rows-12 gap-2 w-full h-full">
            {/* the upper toolbar section */}
            <div className="row-span-1">
              <div className="w-full h-full rounded-xl">
                <Toolbar />
              </div>
            </div>
            {/* main app section */}
            <div className="row-span-11">
              <div className="w-full h-full bg-gray-100 rounded-xl">
                <div className="grid grid-cols-10 gap-2 h-full p-2">
                  {/* the preview part */}
                  <div className="col-span-5">
                    <div className="w-full h-full bg-gray-900 rounded-lg">
                      
                    </div>
                  </div>
                  {/* the selection part */}
                  <div className="col-span-5">
                    <div className="w-full h-full bg-gray-100 rounded-lg border border-gray-300">
                      <ConfigSection/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

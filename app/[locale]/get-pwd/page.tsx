"use client";

import Image from "next/image";

const GetPwd = () => {
  return (
    <div className="from-base-200 to-base-100 min-h-screen bg-gradient-to-b">
      <div className="container mx-auto flex min-h-screen flex-col items-center justify-center p-4">
        <h1 className="mb-2 text-center text-4xl font-bold text-[#26d9b5]">密码获取指南</h1>
        <div className="max-w-md text-center mb-5 text-lg">
          <p className="text-balance">
            扫描下方二维码关注公众号，发送<span className="font-bold text-[#26d9b5]">「#BFD」</span>获取验证码
          </p>
        </div>
        
        {/* 自定义手机模型，具有更好的圆角和更窄的边框 */}
        <div className="relative w-[320px] h-[640px] rounded-[40px] overflow-hidden border-[10px] border-[#26d9b5] shadow-2xl mb-6">
          <div className="absolute inset-0 bg-black">
            {/* 手机内容区域 */}
            <div className="absolute inset-[4px] rounded-[30px] overflow-hidden bg-[#f0f0f0]">
              {/* 手机内容 */}
              <div className="h-full w-full p-4 flex flex-col items-center">
                <h3 className="mb-4 text-2xl font-bold text-[#26d9b5] mt-2">关注公众号获取密码</h3>
                
                {/* 二维码区域 */}
                <div className="mb-6 flex justify-center">
                  <div className="relative h-48 w-48 overflow-hidden rounded-[16px] shadow-md border-4 border-[#26d9b5]/20 p-1">
                    <div className="flex h-full w-full items-center justify-center bg-white rounded-[12px]">
                      {/* 取消注释下面的Image标签并提供正确的图片路径 */}
                      <Image
                        src="/qrcode.jpg"
                        alt="公众号二维码"
                        fill
                        className="object-contain rounded-[12px]"
                      />
                    </div>
                  </div>
                </div>
                
                {/* 步骤说明 */}
                <div className="space-y-4 w-full">
                  <div className="rounded-[20px] bg-white p-4 shadow-md">
                    <p className="text-lg font-medium text-[#26d9b5] flex items-center">
                      <span className="bg-[#26d9b5] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-lg font-bold">1</span>
                      打开微信，扫描上方二维码
                    </p>
                  </div>
                  <div className="rounded-[20px] bg-white p-4 shadow-md">
                    <p className="text-lg font-medium text-[#26d9b5] flex items-center">
                      <span className="bg-[#26d9b5] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-lg font-bold">2</span>
                      点击&quot;关注&quot;按钮
                    </p>
                  </div>
                  <div className="rounded-[20px] bg-white p-4 shadow-md">
                    <p className="text-lg font-medium text-[#26d9b5] flex items-center">
                      <span className="bg-[#26d9b5] text-white rounded-full w-10 h-10 flex items-center justify-center mr-3 text-lg font-bold">3</span>
                      发送<span className="font-bold">#BFD</span>获取验证码
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default GetPwd;

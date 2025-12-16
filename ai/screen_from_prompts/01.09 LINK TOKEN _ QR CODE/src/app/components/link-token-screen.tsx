import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Copy, Download, ArrowLeft, Check, Mail } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";

type LinkStatus = "pending" | "linked";

export default function LinkTokenScreen() {
  const [linkStatus, setLinkStatus] = useState<LinkStatus>("pending");
  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);
  
  // Mock token - in production this would come from the backend
  const linkToken = "ABC123XYZ";
  const qrCodeValue = `tutor-app://link/${linkToken}`;

  const handleCopyToken = () => {
    navigator.clipboard.writeText(linkToken);
    setCopied(true);
    toast.success("Mã đã được sao chép!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById("qr-code");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const downloadLink = document.createElement("a");
      downloadLink.download = "tutor-qr-code.png";
      downloadLink.href = pngFile;
      downloadLink.click();
      
      toast.success("QR code đã được tải xuống!");
    };

    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const handleSendEmail = () => {
    if (!email) {
      toast.error("Vui lòng nhập địa chỉ email");
      return;
    }
    
    if (!email.includes("@")) {
      toast.error("Email không hợp lệ");
      return;
    }

    // Mock email sending - in production this would call the backend
    toast.success(`Email đã được gửi đến ${email}`);
    setEmail("");
  };

  const handleSimulateLink = () => {
    // Simulate linking process
    toast.success("Thiết bị đã được liên kết!");
    setLinkStatus("linked");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Quay lại</span>
        </button>

        {/* Main Card */}
        <Card className="shadow-lg">
          <CardContent className="p-6 md:p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl mb-2">Liên kết với ứng dụng</h1>
              <p className="text-gray-600">
                Chia sẻ mã hoặc QR code này để liên kết với ứng dụng của con
              </p>
            </div>

            {/* Status Indicator */}
            <div className="mb-8">
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                  linkStatus === "linked"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {linkStatus === "linked" ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>Đã liên kết</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span>Chưa liên kết</span>
                  </>
                )}
              </div>
            </div>

            {/* Instructions */}
            <div className="mb-6">
              <h2 className="mb-3">Hướng dẫn con mở app và nhập mã này:</h2>
              
              {/* Token Display */}
              <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-6 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Mã liên kết</p>
                    <p className="text-3xl tracking-wider" style={{ fontFamily: "monospace" }}>
                      {linkToken}
                    </p>
                  </div>
                  <Button
                    onClick={handleCopyToken}
                    variant="outline"
                    size="icon"
                    className="ml-4"
                  >
                    {copied ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : (
                      <Copy className="w-5 h-5" />
                    )}
                  </Button>
                </div>
                <p className="text-sm text-gray-500 mt-3">
                  Mã hợp lệ trong 24 giờ
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500">Hoặc</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* QR Code Section */}
            <div className="mb-6">
              <h2 className="mb-3">Cho con quét mã QR này:</h2>
              
              <div className="bg-white border-2 border-gray-200 rounded-xl p-6 flex flex-col items-center">
                <div className="bg-white p-4 rounded-lg">
                  <QRCodeSVG
                    id="qr-code"
                    value={qrCodeValue}
                    size={200}
                    level="H"
                    includeMargin={true}
                  />
                </div>
                <Button
                  onClick={handleDownloadQR}
                  variant="secondary"
                  className="mt-4"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải QR code
                </Button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 my-8">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="text-gray-500">Hoặc</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Email Section */}
            <div>
              <h2 className="mb-3">Gửi email cho con:</h2>
              
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendEmail();
                    }
                  }}
                  className="flex-1"
                />
                <Button onClick={handleSendEmail}>
                  <Mail className="w-4 h-4 mr-2" />
                  Gửi email
                </Button>
              </div>
            </div>

            {/* Demo Button (for testing) */}
            {linkStatus === "pending" && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <Button
                  onClick={handleSimulateLink}
                  variant="outline"
                  className="w-full"
                >
                  Demo: Mô phỏng liên kết thành công
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Info Box */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Lưu ý:</strong> Mã liên kết chỉ có thể được sử dụng một lần và sẽ hết hạn sau 24 giờ. 
            Sau khi liên kết thành công, con có thể sử dụng ứng dụng để học toán.
          </p>
        </div>
      </div>
    </div>
  );
}

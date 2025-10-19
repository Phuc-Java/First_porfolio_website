"use client";

import { useState, Suspense } from "react";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import { BlurText } from "@/components/ui/BlurText";
import GradientText from "@/components/GradientText";
import DecryptedText from "@/components/DecryptedText";
import ShinyText from "@/components/ShinyText";
import TextType from "@/components/TextType";
import { 
  IconMail, 
  IconBrandGithub, 
  IconBrandFacebook, 
  IconBrandLinkedin,
  IconPhone,
  IconMapPin,
  IconSend,
  IconArrowUp
} from "@tabler/icons-react";

// Dynamic imports for heavy components (Next.js optimization)
const Galaxy = dynamic(() => import("@/components/Galaxy"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/50" />
});

const GooeyNav = dynamic(() => import("@/components/GooeyNav"), {
  ssr: false,
  loading: () => <div className="h-16 bg-black/30 rounded-lg animate-pulse" />
});

/**
 * Contact page - Modern contact form with Galaxy background and GooeyNav
 */
export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    age: "",
    favoriteTeam: "",
    footballTeam: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission with Next.js Server Action pattern
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", gender: "", age: "", favoriteTeam: "", footballTeam: "", message: "" });
      
      setTimeout(() => setSubmitStatus("idle"), 3000);
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const contactInfo = [
    {
      icon: <IconMail className="w-6 h-6" />,
      label: "Email",
      value: "25675921.phuc@student.iuh.edu.vn",
      href: "mailto:25675921.phuc@student.iuh.edu.vn"
    },
    {
      icon: <IconPhone className="w-6 h-6" />,
      label: "Phone",
      value: "+84 XXX XXX XXX",
      href: "tel:+84xxxxxxxxx"
    },
    {
      icon: <IconMapPin className="w-6 h-6" />,
      label: "Location",
      value: "Ho Chi Minh City, Vietnam",
      href: "#"
    }
  ];

  const socialLinks = [
    {
      icon: <IconBrandGithub className="w-6 h-6" />,
      label: "GitHub",
      href: "https://github.com/Phuc-Java",
      color: "hover:bg-gray-700"
    },
    {
      icon: <IconBrandFacebook className="w-6 h-6" />,
      label: "Facebook",
      href: "https://www.facebook.com/nguyen.tuan.phuc.942283",
      color: "hover:bg-blue-600"
    },
    {
      icon: <IconBrandLinkedin className="w-6 h-6" />,
      label: "LinkedIn",
      href: "#",
      color: "hover:bg-blue-500"
    },
    {
      icon: <IconMail className="w-6 h-6" />,
      label: "Email",
      href: "mailto:25675921.phuc@student.iuh.edu.vn",
      color: "hover:bg-red-600"
    }
  ];

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Tasks", href: "/tasks" },
    { label: "Profile", href: "/profile" },
    { label: "Archive", href: "/archive" },
  ];

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden">
      {/* Optimized Deep Space Galaxy Background - Fixed */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Suspense fallback={<div className="w-full h-full bg-gradient-to-b from-black via-purple-950/20 to-black" />}>
          <Galaxy
            focal={[0.5, 0.5]}
            rotation={[1.0, 0.0]}
            starSpeed={0.2}
            density={0.8}
            hueShift={260}
            speed={0.3}
            mouseInteraction={false}
            glowIntensity={0.25}
            saturation={0.2}
            mouseRepulsion={false}
            twinkleIntensity={0.3}
            rotationSpeed={0.02}
            repulsionStrength={0}
            transparent={false}
          />
        </Suspense>
      </div>

      {/* GooeyNav - Fixed at Top Center */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6">
        <div className="backdrop-blur-sm bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-full px-6 py-3 shadow-2xl shadow-purple-500/20 hover:shadow-purple-500/30 transition-all duration-300">
          <Suspense fallback={<div className="h-10 w-64 bg-white/10 rounded-full animate-pulse" />}>
            <GooeyNav 
              items={navItems}
              initialActiveIndex={2}
              animationTime={600}
              particleCount={15}
              colors={[1, 2, 3, 4]}
            />
          </Suspense>
        </div>
      </header>

      {/* Main Content - Scrollable */}
      <main className="relative z-10 pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          
          {/* Page Title with Effects */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-6">
              <BlurText
                text="Liên hệ với mình"
                delay={100}
                animateBy="words"
                direction="top"
                className="text-5xl sm:text-6xl md:text-7xl font-bold text-white tracking-wide font-[family-name:var(--font-playfair)]"
              />
            </div>
            <div className="max-w-2xl mx-auto">
              <DecryptedText
                text="Hãy gửi tin nhắn cho mình nếu bạn muốn hợp tác, có câu hỏi hoặc chỉ muốn kết nối!"
                speed={30}
                maxIterations={10}
                className="text-xl text-white/80"
                animateOn="view"
                revealDirection="start"
              />
            </div>
          </motion.div>

          {/* Contact Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-20">
            
            {/* Left Column - Contact Info & Social */}
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {/* Contact Information Cards */}
              <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-3xl p-8">
                <div className="mb-6">
                  <ShinyText 
                    text="Thông tin liên hệ"
                    speed={3}
                    className="text-2xl font-bold"
                  />
                </div>
                
                <div className="space-y-4">
                  {contactInfo.map((info, index) => (
                    <motion.a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group"
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                        {info.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-white/50">{info.label}</p>
                        <p className="text-white font-medium">{info.value}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Media Links */}
              <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-3xl p-8">
                <div className="mb-6">
                  <GradientText
                    colors={["#40ffaa", "#4079ff", "#9333ea"]}
                    animationSpeed={5}
                    showBorder={false}
                    className="text-2xl font-bold"
                  >
                    Kết nối với mình
                  </GradientText>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 transition-all duration-300 group ${social.color}`}
                      whileHover={{ scale: 1.05, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-white group-hover:scale-110 transition-transform">
                        {social.icon}
                      </div>
                      <p className="text-sm text-white/70 group-hover:text-white transition-colors">
                        {social.label}
                      </p>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Quick Stats with Animated Text */}
              <div className="backdrop-blur-md bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 rounded-3xl p-8">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <ShinyText text="24/7" speed={2} className="text-3xl font-bold mb-1" />
                    <p className="text-sm text-white/60">Available</p>
                  </div>
                  <div>
                    <ShinyText text="<24h" speed={2} className="text-3xl font-bold mb-1" />
                    <p className="text-sm text-white/60">Response</p>
                  </div>
                  <div>
                    <ShinyText text="100%" speed={2} className="text-3xl font-bold mb-1" />
                    <p className="text-sm text-white/60">Support</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Contact Form */}
            <motion.div
              className="backdrop-blur-md bg-black/30 border border-white/10 rounded-3xl p-8"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="mb-6">
                <GradientText
                  colors={["#40ffaa", "#4079ff", "#9333ea"]}
                  animationSpeed={5}
                  showBorder={false}
                  className="text-2xl font-bold"
                >
                  Gửi tin nhắn
                </GradientText>
                <p className="text-white/60 mt-2">
                  Điền thông tin và mình sẽ phản hồi trong thời gian sớm nhất
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-white/80 mb-2 text-sm font-medium">
                    Tên của bạn
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                    placeholder="Nguyễn Văn A"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-white/80 mb-2 text-sm font-medium">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                    placeholder="email@example.com"
                  />
                </div>

                {/* Gender and Age Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Gender Select */}
                  <div>
                    <label htmlFor="gender" className="block text-white/80 mb-2 text-sm font-medium">
                      Giới tính
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                    >
                      <option value="" className="bg-gray-900">Chọn giới tính</option>
                      <option value="male" className="bg-gray-900">Nam</option>
                      <option value="female" className="bg-gray-900">Nữ</option>
                      <option value="other" className="bg-gray-900">Khác</option>
                    </select>
                  </div>

                  {/* Age Input */}
                  <div>
                    <label htmlFor="age" className="block text-white/80 mb-2 text-sm font-medium">
                      Tuổi
                    </label>
                    <input
                      type="number"
                      id="age"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      required
                      min="1"
                      max="120"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                      placeholder="18"
                    />
                  </div>
                </div>

                {/* Favorite Team Select */}
                <div>
                  <label htmlFor="favoriteTeam" className="block text-white/80 mb-2 text-sm font-medium">
                    Đội tuyển yêu thích
                  </label>
                  <select
                    id="favoriteTeam"
                    name="favoriteTeam"
                    value={formData.favoriteTeam}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                  >
                    <option value="" className="bg-gray-900">Chọn đội tuyển Liên Quân Mobile yêu thíc</option>
                    <optgroup label="VCS - Việt Nam" className="bg-gray-900">
                      <option value="SGP" className="bg-gray-900">Saigon Phantom (SGP)</option>
                      <option value="FPT" className="bg-gray-900">FPT x Flash (FPT)</option>
                      <option value="1S" className="bg-gray-900">One Star Esports (1S)</option>
                      <option value="BOX" className="bg-gray-900">BOX Gaming (BOX)</option>
                      <option value="TDT" className="bg-gray-900">The DareDevil Team (TDT)</option>
                      <option value="SPN" className="bg-gray-900">Super Nova (SPN)</option>
                      <option value="BSS" className="bg-gray-900">Black Sarus Sports (BSS)</option>
                      <option value="FPL" className="bg-gray-900">FPT Polytechnic (FPL)</option>
                    </optgroup>
                    <optgroup label="RPL - Thái Lan" className="bg-gray-900">
                      <option value="BAC" className="bg-gray-900">Bacon Time (BAC)</option>
                      <option value="TLN" className="bg-gray-900">Talon Esports (TLN)</option>
                      <option value="BRU" className="bg-gray-900">Buriram United Esports (BRU)</option>
                      <option value="EA" className="bg-gray-900">eArena (EA)</option>
                      <option value="FS" className="bg-gray-900">FULL SENSE (FS)</option>
                      <option value="PSG" className="bg-gray-900">PSG Esports (PSG)</option>
                      <option value="KOG" className="bg-gray-900">King of Gamers Club (KOG)</option>
                    </optgroup>
                    <optgroup label="GCS - Đài Bắc Trung Hoa" className="bg-gray-900">
                      <option value="FW" className="bg-gray-900">Flash Wolves (FW)</option>
                      <option value="HKA" className="bg-gray-900">Hong Kong Attitude (HKA)</option>
                      <option value="BMG" className="bg-gray-900">BanMei Gaming (BMG)</option>
                      <option value="ONE" className="bg-gray-900">ONE Team Esports (ONE)</option>
                      <option value="DCG" className="bg-gray-900">Deep Cross Gaming (DCG)</option>
                      <option value="ANK" className="bg-gray-900">ANK Gaming (ANK)</option>
                    </optgroup>
                  </select>
                </div>

                {/* Football Team Select */}
                <div>
                  <label htmlFor="footballTeam" className="block text-white/80 mb-2 text-sm font-medium">
                    Đội bóng châu Âu yêu thích
                  </label>
                  <select
                    id="footballTeam"
                    name="footballTeam"
                    value={formData.footballTeam}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300"
                  >
                    <option value="" className="bg-gray-900">Chọn đội bóng châu âu yêu thích</option>
                    <optgroup label="🏴󐁧󐁢󐁥󐁮󐁧󐁿 Premier League - Anh" className="bg-gray-900">
                      <option value="MUN" className="bg-gray-900">Manchester United</option>
                      <option value="LIV" className="bg-gray-900">Liverpool</option>
                      <option value="ARS" className="bg-gray-900">Arsenal</option>
                      <option value="CHE" className="bg-gray-900">Chelsea</option>
                      <option value="MCI" className="bg-gray-900">Manchester City</option>
                      <option value="TOT" className="bg-gray-900">Tottenham Hotspur</option>
                    </optgroup>
                    <optgroup label="🇪🇸 La Liga - Tây Ban Nha" className="bg-gray-900">
                      <option value="RMA" className="bg-gray-900">Real Madrid</option>
                      <option value="BAR" className="bg-gray-900">FC Barcelona</option>
                      <option value="ATM" className="bg-gray-900">Atlético Madrid</option>
                    </optgroup>
                    <optgroup label="🇩🇪 Bundesliga - Đức" className="bg-gray-900">
                      <option value="BAY" className="bg-gray-900">Bayern Munich</option>
                      <option value="BVB" className="bg-gray-900">Borussia Dortmund</option>
                    </optgroup>
                    <optgroup label="🇮🇹 Serie A - Ý" className="bg-gray-900">
                      <option value="JUV" className="bg-gray-900">Juventus</option>
                      <option value="ACM" className="bg-gray-900">AC Milan</option>
                      <option value="INT" className="bg-gray-900">Inter Milan</option>
                    </optgroup>
                    <optgroup label="🇫🇷 Ligue 1 - Pháp" className="bg-gray-900">
                      <option value="PSG" className="bg-gray-900">Paris Saint-Germain</option>
                      <option value="MAR" className="bg-gray-900">Olympique de Marseille</option>
                      <option value="ASM" className="bg-gray-900">AS Monaco</option>
                    </optgroup>
                    <optgroup label="🌍 Các quốc gia khác" className="bg-gray-900">
                      <option value="AJA" className="bg-gray-900">Ajax (Hà Lan)</option>
                      <option value="POR" className="bg-gray-900">FC Porto (Bồ Đào Nha)</option>
                      <option value="BEN" className="bg-gray-900">Benfica (Bồ Đào Nha)</option>
                      <option value="CEL" className="bg-gray-900">Celtic (Scotland)</option>
                      <option value="RAN" className="bg-gray-900">Rangers (Scotland)</option>
                    </optgroup>
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2 text-sm font-medium">
                    Tin nhắn
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 resize-none"
                    placeholder="Viết tin nhắn của bạn tại đây..."
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300 ${
                    isSubmitting
                      ? "bg-gray-600 cursor-not-allowed"
                      : submitStatus === "success"
                      ? "bg-green-600"
                      : "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang gửi...</span>
                    </>
                  ) : submitStatus === "success" ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Đã gửi thành công!</span>
                    </>
                  ) : (
                    <>
                      <IconSend className="w-5 h-5" />
                      <span>Gửi tin nhắn</span>
                    </>
                  )}
                </motion.button>

                {/* Success Message */}
                {submitStatus === "success" && (
                  <motion.p
                    className="text-center text-green-400 text-sm"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    Cảm ơn bạn đã liên hệ! Mình sẽ phản hồi sớm nhất có thể.
                  </motion.p>
                )}
              </form>
            </motion.div>

          </div>

          {/* Additional Info Section with Text Effects */}
          <motion.div 
            className="backdrop-blur-md bg-black/30 border border-white/10 rounded-3xl p-12 mb-20"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Title Section - Centered */}
            <div className="text-center mb-6">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Tại sao nên liên hệ với mình?
              </h2>
              <div className="flex justify-center">
                <TextType
                  text={[
                    "Mình luôn sẵn sàng lắng nghe và hợp tác trong các dự án thú vị",
                    "Làm việc chuyên nghiệp với tinh thần trách nhiệm cao",
                    "Phản hồi nhanh chóng và tư vấn tận tình",
                    "Sáng tạo giải pháp tối ưu cho mọi vấn đề"
                  ]}
                  typingSpeed={60}
                  pauseDuration={2500}
                  deletingSpeed={40}
                  showCursor={true}
                  cursorCharacter="|"
                  textColors={[
                    "#00d9ff",
                    "#c084fc", 
                    "#40ffaa",
                    "#ff6b9d"
                  ]}
                  className="text-xl md:text-2xl text-white/80 max-w-3xl font-light"
                  cursorClassName="text-cyan-400 font-bold"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center gap-3 my-10">
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
              <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-4xl shadow-lg shadow-purple-500/30">
                  💡
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  <ShinyText text="Sáng tạo" speed={3} />
                </h3>
                <p className="text-white/60 text-base leading-relaxed">
                  Luôn tìm kiếm giải pháp mới và sáng tạo cho mọi vấn đề
                </p>
              </motion.div>

              <motion.div 
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center text-4xl shadow-lg shadow-green-500/30">
                  🚀
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  <ShinyText text="Nhanh chóng" speed={3} />
                </h3>
                <p className="text-white/60 text-base leading-relaxed">
                  Phản hồi và hoàn thành công việc trong thời gian ngắn nhất
                </p>
              </motion.div>

              <motion.div 
                className="text-center p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-300 hover:scale-105"
                whileHover={{ y: -5 }}
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-500 to-pink-500 flex items-center justify-center text-4xl shadow-lg shadow-orange-500/30">
                  🤝
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  <ShinyText text="Chuyên nghiệp" speed={3} />
                </h3>
                <p className="text-white/60 text-base leading-relaxed">
                  Làm việc có trách nhiệm và đảm bảo chất lượng cao nhất
                </p>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </main>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 flex items-center justify-center text-white shadow-lg shadow-purple-500/30 transition-all duration-300"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1, y: -5 }}
        whileTap={{ scale: 0.9 }}
      >
        <IconArrowUp className="w-6 h-6" />
      </motion.button>
    </div>
  );
}

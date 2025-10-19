"use client";

import LaserFlow from '@/components/LaserFlow';
import ProfileCard from '@/components/ProfileCard';
import { useRef, useState } from 'react';
import Image from 'next/image';
import GradientText from '../../components/GradientText'
import DecryptedText from '../../components/DecryptedText';
import ShinyText from '@/components/ShinyText';
import { LoadingOverlay } from '@/components/ui/LoadingOverlay';
import { PinContainer } from '@/components/ui/3d-pin';
import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { motion } from "motion/react";
import { LiaSmileWink } from "react-icons/lia";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconHome,
  IconClipboardList,
  IconUser,
  IconArchive,
} from "@tabler/icons-react";
import { usePageTransition } from "@/lib/hooks/usePageTransition";
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';
/**
 * Profile page - Professional profile layout with sidebar navigation
 */
export default function ProfilePage() {
    const { isPending, navigate } = usePageTransition();
    const router = useRouter();
    const [open, setOpen] = useState(false);
    
    const links = [
      {
        label: "Home",
        href: "/",
        icon: (
          <IconHome className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Tasks",
        href: "/tasks",
        icon: (
          <IconClipboardList className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Contact",
        href: "/contact",
        icon: (
          <IconUser className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
      {
        label: "Archive",
        href: "/archive",
        icon: (
          <IconArchive className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
        ),
      },
    ];
    
    const revealImgRef = useRef(null);
    
  return (
    <div className="relative w-full min-h-screen flex">
      <LoadingOverlay isLoading={isPending} />
      
      {/* Sidebar - Sticky position */}
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <div 
                    key={idx} 
                    onClick={() => navigate(link.href)}
                    className="cursor-pointer"
                  >
                    <SidebarLink link={link} />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <SidebarLink
                link={{
                  label: "Nguyễn Tuấn Phúc",
                  href: "#",
                  icon: (
                    <div className="h-8 w-8 shrink-0 rounded-full bg-white flex items-center justify-center border-2 border-purple-500/30">
                      <img
                        src="/vest1-removebg-preview.png"
                        className="h-7 w-7 rounded-full object-cover"
                        width={50}
                        height={50}
                        alt="Nguyễn Tuấn Phúc"
                      />
                    </div>
                  ),
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>

      {/* Main Content - Flex grow to fill space */}
      <div className="flex-1 w-full transition-all duration-300">
      {/* LaserFlow Background Container */}
      <div 
        style={{ 
          height: '600px', 
          position: 'relative', 
          overflow: 'hidden',
          backgroundColor: '#060010'
        }}
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const el = revealImgRef.current as HTMLElement | null;
          if (el) {
            el.style.setProperty('--mx', `${x}px`);
            el.style.setProperty('--my', `${y + rect.height * 0.5}px`);
          }
        }}
        onMouseLeave={() => {
          const el = revealImgRef.current as HTMLElement | null;
          if (el) {
            el.style.setProperty('--mx', '-9999px');
            el.style.setProperty('--my', '-9999px');
          }
        }}
      >
        <LaserFlow
          horizontalBeamOffset={0.17}
          verticalBeamOffset={0.0}
          color="#9333ea"
          verticalSizing={2.0}
          horizontalSizing={0.8}
          decay={1.0}
          falloffStart={1.6} 
        />
      </div>

      {/* Profile Content Box - Below LaserFlow */}
      <div 
        style={{
          position: 'relative',
          margin: '-300px auto 0 auto',
          width: '86%',
          maxWidth: '1400px',
          backgroundColor: '#060010',
          borderRadius: '20px',
          border: '2px solid #9333ea',
          padding: '3rem 2rem',
          zIndex: 10
        }}
      >
        {/* Profile Hero Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Left Section - Profile Info */}
          <div className="space-y-6">
            {/* Quote Badge */}
            <div className="inline-flex items-center gap-3 backdrop-blur-md bg-black/30 border border-white/10 rounded-full px-4 py-2">
              <div className="w-6 h-6 flex items-center justify-center rounded-full overflow-hidden bg-transparent">
                <img 
                  src="/vest1-removebg-preview.png" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-white/80 text-xs">
                "Có chí thì nên"
              </span>
            </div>

            {/* Main Title */}
            <div className="leading-tight">
              <GradientText
                colors={["#40ffaa", "#4079ff", "#9333ea", "#4079ff", "#40ffaa"]}
                animationSpeed={5}
                showBorder={false}
                className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              >
                Xin chào, Mình là Nguyễn Tuấn Phúc!
              </GradientText>
            </div>

            {/* Description */}
            <div className="space-y-3 text-sm sm:text-base text-white/70 leading-relaxed">
              <div className="flex items-start gap-2">
                <span>•</span>
                <DecryptedText
                  text="Tôi là sinh viên năm nhất Đại học Công nghiệp IUH"
                  speed={50}
                  maxIterations={50}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
                  className="text-white/70"
                  animateOn="both"
                  revealDirection="center"
                />
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <DecryptedText
                  text="Tôi đã bắt đầu viết website cá nhân đầu tiên vào ngày 17/10/2025"
                  speed={50}
                  maxIterations={50}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789/"
                  className="text-white/70"
                  animateOn="both"
                  revealDirection="center"
                />
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <DecryptedText
                  text="Công nghệ tôi biết: ReactJS, NextJS, TailwindCSS, HTML, CSS, JavaScript, Python, Java, C"
                  speed={50}
                  maxIterations={50}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,:"
                  className="text-white/70"
                  animateOn="both"
                  revealDirection="center"
                />
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <DecryptedText
                  text="Công nghệ đang học: Đám mây, Mạng máy tính, Linux, Hacking Basic, AI"
                  speed={50}
                  maxIterations={50}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,:"
                  className="text-white/70"
                  animateOn="both"
                  revealDirection="center"
                />
              </div>
              <div className="flex items-start gap-2">
                <span>•</span>
                <DecryptedText
                  text="Tôi thích làm việc với các công cụ AI và công nghệ mạnh mẽ, học nhanh và sẵn sàng tiếp thu kiến thức mới. Luôn tôn trọng tiền bối trong ngành."
                  speed={50}
                  maxIterations={50}
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789,."
                  className="text-white/70"
                  animateOn="both"
                  revealDirection="center"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full px-6 py-3 text-sm text-white/80 hover:text-white transition-all duration-300 hover:scale-105">
                Download CV
              </button>
              <button className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-full px-6 py-3 text-sm text-white/80 hover:text-white transition-all duration-300 hover:scale-105">
                Projects
              </button>
            </div>
          </div>

          {/* Right Section - Profile Card */}
          <div className="flex justify-center lg:justify-end">
            <ProfileCard
              name="Nguyễn Tuấn Phúc"
              title="Full Stack Developer"
              handle="NguyenTuanPhuc"
              status="Online"
              contactText="Contact Me"
              avatarUrl="/vest1-removebg-preview.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => router.push('/contact')}
            />
          </div>

        </div>

        {/* Additional Content Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#9333ea"]}
              animationSpeed={5}
              showBorder={false}
              className="text-2xl font-bold"
            >
              Kỹ năng & Kinh nghiệm
            </GradientText>
          </h3>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Skill Card 1 - Frontend */}
            <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-2xl">
                  🎨
                </div>
                <h4 className="text-lg font-semibold text-white">Frontend Development</h4>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Xây dựng giao diện người dùng hiện đại, responsive với các framework mới nhất
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">React</span>
                <span className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">Next.js</span>
                <span className="px-3 py-1 text-xs rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">Tailwind</span>
              </div>
            </div>

            {/* Skill Card 2 - Backend */}
            <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-2xl">
                  ⚙️
                </div>
                <h4 className="text-lg font-semibold text-white">Backend Development</h4>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Phát triển API, xử lý logic nghiệp vụ và quản lý database
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-green-500/20 text-green-300 border border-green-500/30">Python</span>
                <span className="px-3 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">Java</span>
                <span className="px-3 py-1 text-xs rounded-full bg-red-500/20 text-red-300 border border-red-500/30">C</span>
              </div>
            </div>

            {/* Skill Card 3 - Other */}
            <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center text-2xl">
                  🚀
                </div>
                <h4 className="text-lg font-semibold text-white">Tools & Technologies</h4>
              </div>
              <p className="text-sm text-white/60 mb-3">
                Công cụ và công nghệ hỗ trợ trong quá trình phát triển
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 text-xs rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">Cloud</span>
                <span className="px-3 py-1 text-xs rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">Linux</span>
                <span className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">AI</span>
              </div>
            </div>

          </div>
        </div>

        {/* Projects Section with 3D Pins */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <h3 className="text-2xl font-bold text-white text-center">
            <GradientText
              colors={["#40ffaa", "#4079ff", "#9333ea"]}
              animationSpeed={5}
              showBorder={false}
              className="text-2xl font-bold"
            >
              MY INFORMATION
            </GradientText>
          </h3>

          {/* 3D Pin Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Project 1 */}
            <div className="h-[30rem] flex items-center justify-center">
              <PinContainer
                title="Github"
                href="https://github.com/Phuc-Java"
              >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                    Github
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500">
                      Tổng hợp các dự án mã nguồn và đóng góp của tôi. Nơi thể hiện rõ nhất kỹ năng và quá trình phát triển bản thân.
                    </span>
                  </div>
                  <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden relative">
                    <Image 
                      src="/Screenshot 2025-10-19 143553.png" 
                      alt="Github Profile" 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </PinContainer>
            </div>

            {/* Project 2 */}
            <div className="h-[30rem] flex items-center justify-center">
              <PinContainer
                title="Facebook"
                href="https://www.facebook.com/nguyen.tuan.phuc.942283"
              >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                    Facebook
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500">
                      Cùng kết nối và giao lưu với mình nhé! Đây là nơi mình chia sẻ về học tập, công nghệ và cuộc sống thường ngày.
                    </span>
                  </div>
                  <div className="flex flex-1 w-full rounded-lg mt-4 overflow-hidden relative">
                    <Image 
                      src="/Screenshot 2025-10-19 135218.png" 
                      alt="Facebook Profile" 
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                </div>
              </PinContainer>
            </div>

            {/* Project 3 */}
            <div className="h-[30rem] flex items-center justify-center">
              <PinContainer
                title="Văn phòng phẩm Online"
                href="#"
              >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 w-[20rem] h-[20rem]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                    Văn phòng phẩm Online
                  </h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                    <span className="text-slate-500">
                      Dự án nhà sách trực tuyến, nơi người dùng có thể dễ dàng tìm kiếm, lựa chọn và đặt mua các loại dụng cụ học tập, bút viết.
                    </span>
                  </div>
                  <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-orange-500 via-pink-500 to-red-500 overflow-hidden">
                    {/* Bạn có thể thay bằng ảnh: */}
                    {/* <img src="/vanphongpham-preview.png" alt="Văn phòng phẩm" className="w-full h-full object-cover" /> */}
                  </div>
                </div>
              </PinContainer>
            </div>

          </div>
        </div>

        {/* Professional Footer Section */}
        <div className="mt-16 pt-12 border-t border-white/10">
          {/* LayoutTextFlip - Tech Stack */}
          <motion.div 
            className="relative mx-4 mb-8 flex flex-col items-center justify-center gap-4 text-center sm:mx-0 sm:flex-row"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <LayoutTextFlip
              text="Website được tạo ra bằng công nghệ: "
              words={["ReactJS", "NextJS", "TailwindCSS", "TypeScript", "Framer Motion", "Aceternity UI"]}
            />
          </motion.div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-3 my-8">
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <div className="h-[1px] w-20 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          </div>

          {/* Footer Content */}
          <div className="text-center space-y-4">
            {/* Main Message with Icon */}
            <div className="flex items-center justify-center gap-2">
              <p className="text-base sm:text-lg text-white/70">
                Trải nghiệm Website sáng tạo của mình và chúc bạn có một ngày vui vẻ
              </p>
              <LiaSmileWink className="text-3xl text-purple-400 animate-bounce" />
            </div>

            {/* Copyright & Credits */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-white/50">
              <span>© 2025 Nguyễn Tuấn Phúc.</span>
              <span className="hidden sm:inline">•</span>
              <span>Crafted with 💜 and ☕</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 pt-4">
              <a 
                href="https://github.com/Phuc-Java" 
                target="_blank" 
                rel="noopener noreferrer"
                className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-full p-3 transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://www.facebook.com/nguyen.tuan.phuc.942283" 
                target="_blank" 
                rel="noopener noreferrer"
                className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-blue-500/50 rounded-full p-3 transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-blue-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="mailto:25675921.phuc@student.iuh.edu.vn" 
                target="_blank" 
                rel="noopener noreferrer"
                className="backdrop-blur-md bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/50 rounded-full p-3 transition-all duration-300 hover:scale-110 group"
              >
                <svg className="w-5 h-5 text-white/60 group-hover:text-red-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                </svg>
              </a>
            </div>

            {/* Back to Top Indicator */}
            <div className="pt-6">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="backdrop-blur-md bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 hover:border-purple-500/50 rounded-full px-6 py-2 text-sm text-purple-300 hover:text-purple-200 transition-all duration-300 hover:scale-105 flex items-center gap-2 mx-auto group"
              >
                <span>Lên đầu trang</span>
                <svg className="w-4 h-4 transform group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>
        </div>

      </div>

      <div className="h-12"></div>
      </div>
    </div>
  );
}

// Logo components for Sidebar
export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-3 py-2 text-sm font-normal"
    >
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="h-10 w-10 shrink-0 object-contain"
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-semibold whitespace-pre"
      >
        <ShinyText text="Portfolio" speed={3} className="text-lg" />
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center justify-center py-2"
    >
      <img 
        src="/logo.png" 
        alt="Logo" 
        className="h-10 w-10 shrink-0 object-contain"
      />
    </a>
  );
};

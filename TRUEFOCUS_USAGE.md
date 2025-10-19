# TrueFocus Component - Usage Guide

## 📋 Overview
TrueFocus component tạo hiệu ứng focus interactive với animated border khi hover vào text.

## 🎯 Features
- ✅ Manual mode (hover để focus) hoặc auto-cycle mode
- ✅ Focus theo từng word hoặc theo phrases (cụm từ)
- ✅ Animated corner brackets với glow effect
- ✅ Blur effect cho text không active
- ✅ Smooth transitions
- ✅ Responsive và lightweight

## 📝 Basic Usage

### 1. Focus theo Words (mặc định)
```tsx
import { TrueFocus } from '@/components/ui/TrueFocus';

<TrueFocus 
  sentence="Mobile Developer"
  manualMode={true}  // Hover để focus, không auto
/>
```

### 2. Focus theo Phrases (như ảnh của bạn)
```tsx
<TrueFocus 
  sentence="Mobile Developer"
  phrases={["Mobile", "Developer"]}  // Group thành 2 phrases
  manualMode={true}
  borderColor="#00d9ff"
  glowColor="rgba(0, 217, 255, 0.6)"
/>
```

### 3. Auto-cycle Mode
```tsx
<TrueFocus 
  sentence="Web Developer Content Creator Designer"
  manualMode={false}  // Tự động cycle
  animationDuration={0.5}
  pauseBetweenAnimations={2}
/>
```

## 🎨 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sentence` | `string` | **required** | Text cần hiển thị |
| `phrases` | `string[]` | `undefined` | Group words thành phrases. Nếu không có sẽ split by spaces |
| `manualMode` | `boolean` | `true` | `true`: hover để focus, `false`: auto-cycle |
| `blurAmount` | `number` | `4` | Độ blur (px) cho text không active |
| `borderColor` | `string` | `"#00d9ff"` | Màu border corners |
| `glowColor` | `string` | `"rgba(0, 217, 255, 0.6)"` | Màu glow effect |
| `animationDuration` | `number` | `0.3` | Thời gian animation (seconds) |
| `pauseBetweenAnimations` | `number` | `1` | Thời gian dừng giữa cycles (seconds) - chỉ dùng khi auto mode |
| `className` | `string` | `""` | Custom className |

## 🎭 Examples

### Example 1: Hero Subtitle (như ảnh)
```tsx
<TrueFocus 
  sentence="Mobile Developer"
  manualMode={true}
  blurAmount={3}
  borderColor="#00d9ff"
  className="text-xl md:text-2xl"
/>
```

### Example 2: Multi-role với Phrases
```tsx
<TrueFocus 
  sentence="Frontend Backend DevOps"
  phrases={["Frontend", "Backend", "DevOps"]}
  manualMode={true}
  borderColor="#10b981"
  glowColor="rgba(16, 185, 129, 0.6)"
/>
```

### Example 3: Animated Skills
```tsx
<TrueFocus 
  sentence="React Next.js TypeScript Tailwind"
  manualMode={false}  // Auto cycle
  animationDuration={0.4}
  pauseBetweenAnimations={1.5}
  borderColor="#8b5cf6"
/>
```

### Example 4: Long Phrase Focus
```tsx
<TrueFocus 
  sentence="I love coding I love design I love coffee"
  phrases={["I love coding", "I love design", "I love coffee"]}
  manualMode={true}
  className="text-lg"
/>
```

## 🎨 Color Themes

### Cyan Theme (Default)
```tsx
borderColor="#00d9ff"
glowColor="rgba(0, 217, 255, 0.6)"
```

### Green Theme
```tsx
borderColor="#10b981"
glowColor="rgba(16, 185, 129, 0.6)"
```

### Purple Theme
```tsx
borderColor="#8b5cf6"
glowColor="rgba(139, 92, 246, 0.6)"
```

### Red Theme
```tsx
borderColor="#ef4444"
glowColor="rgba(239, 68, 68, 0.6)"
```

### Orange Theme
```tsx
borderColor="#f97316"
glowColor="rgba(249, 115, 22, 0.6)"
```

## 💡 Tips

1. **Responsive sizing**: Dùng Tailwind classes trong `className`
   ```tsx
   className="text-base md:text-xl lg:text-2xl"
   ```

2. **Spacing**: Thêm padding/margin qua `className`
   ```tsx
   className="py-4 px-2"
   ```

3. **Multiple instances**: Bạn có thể dùng nhiều TrueFocus trên cùng trang
   ```tsx
   <div className="space-y-4">
     <TrueFocus sentence="First Line" />
     <TrueFocus sentence="Second Line" />
   </div>
   ```

4. **Performance**: Component đã được optimize với `React.memo`

## 🔧 Customization

### Custom Animation Speed
```tsx
<TrueFocus 
  sentence="Fast Animation"
  animationDuration={0.15}  // Very fast
/>
```

### No Blur Effect
```tsx
<TrueFocus 
  sentence="Sharp Text"
  blurAmount={0}  // No blur
/>
```

### Large Corners
Nếu muốn corners lớn hơn, edit `TrueFocus.tsx`:
```tsx
className="absolute w-4 h-4 border-[3px]"  // Thay vì w-3 h-3
```

## 🎯 Best Practices

1. ✅ Dùng `manualMode={true}` cho subtitle/hero sections
2. ✅ Dùng `phrases` khi muốn focus theo cụm từ thay vì từng word
3. ✅ Giữ `blurAmount` từ 2-5 để không quá mờ
4. ✅ Match `borderColor` với theme của bạn
5. ✅ Responsive text size với Tailwind breakpoints

## 🚀 Current Implementation (page.tsx)

```tsx
<TrueFocus 
  sentence="Mobile Developer"
  manualMode={true}
  blurAmount={3}
  borderColor="#00d9ff"
  glowColor="rgba(0, 217, 255, 0.6)"
  animationDuration={0.3}
  className="py-2"
/>
```

Hiệu ứng:
- ✅ Di chuột vào "Mobile" → focus "Mobile"
- ✅ Di chuột vào "Developer" → focus "Developer"
- ✅ Di chuột ra ngoài → ẩn focus border
- ✅ Text không hover bị blur 3px
- ✅ Cyan color theme

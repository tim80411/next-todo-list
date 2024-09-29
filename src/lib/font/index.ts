import {Noto_Sans} from 'next/font/google'

export const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["400", "700"],
  preload: true,
});
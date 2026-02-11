// import Navbar from "../components/layout/Navbar";
// import {
//   FiUsers,
//   FiTrendingUp,
//   FiShield,
//   FiSmartphone,
//   FiCheckCircle,
// } from "react-icons/fi";
// import {
//   FaLinkedin,
//   FaInstagram,
//   FaGithub,
//   FaXTwitter,
//   FaEnvelope,
// } from "react-icons/fa6";
// import { SiLeetcode } from "react-icons/si";

// export default function Landing() {
//   return (
//     <>
//       {/* GLOBAL BACKGROUND */}
//       <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden">
//         <div className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] bg-cyan-500/10 blur-3xl rounded-full animate-pulse" />
//         <div className="absolute bottom-[-300px] right-[-300px] w-[600px] h-[600px] bg-indigo-500/10 blur-3xl rounded-full animate-pulse" />
//       </div>

//       <Navbar />

//       {/* HERO */}
//       <section className="relative overflow-hidden">
//         <div className="max-w-7xl mx-auto px-6 py-32 text-center">
//           <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
//             Split expenses. <br />
//             <span className="text-cyan-400">Not friendships.</span>
//           </h1>

//           <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto">
//             Track shared expenses, remove confusion, and keep friendships stress-free —
//             whether it’s trips, rent, food, or daily spending.
//           </p>

//           <div className="mt-10 flex justify-center gap-4">
//             <a
//               href="/register"
//               className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 hover:scale-105 transition"
//             >
//               Get Started Free
//             </a>
//             <a
//               href="/login"
//               className="px-8 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition"
//             >
//               Login
//             </a>
//           </div>
//         </div>
//       </section>

//       {/* IMAGE BREAK */}
//       <section className="max-w-6xl mx-auto px-6">
//         <img
//           src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
//           alt="group"
//           className="rounded-3xl shadow-lg opacity-90 hover:opacity-100 transition"
//         />
//       </section>

//       {/* FEATURES */}
//       <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8">
//         {[
//           { title: "Group Expenses", desc: "Create groups and track shared expenses effortlessly." },
//           { title: "Instant Balances", desc: "Know exactly who owes whom, anytime, anywhere." },
//           { title: "Easy Settlements", desc: "Settle balances quickly with minimum transactions." },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300"
//           >
//             <h3 className="text-xl font-semibold text-cyan-400">{item.title}</h3>
//             <p className="mt-4 text-slate-400">{item.desc}</p>
//           </div>
//         ))}
//       </section>

//       {/* TRUST COPY (NEW) */}
//       <section className="max-w-4xl mx-auto px-6 py-12 text-center">
//         <p className="text-slate-400 text-lg leading-relaxed">
//           Designed for real-life groups — roommates, friends, trips, families, and teams.
//           SplitWise keeps everything transparent so money never becomes the reason for awkward moments.
//         </p>
//       </section>

//       {/* HOW IT WORKS */}
//       <section className="max-w-7xl mx-auto px-6 py-24">
//         <h2 className="text-4xl font-bold text-center mb-16">
//           How <span className="text-cyan-400">SplitWise</span> Works
//         </h2>

//         <div className="grid md:grid-cols-3 gap-10">
//           {[
//             { step: "01", title: "Create a Group", desc: "Add friends, roommates, or travel buddies in seconds." },
//             { step: "02", title: "Add Expenses", desc: "Log expenses once — we handle all calculations." },
//             { step: "03", title: "Settle Up", desc: "Clear balances easily with zero confusion." },
//           ].map((item, i) => (
//             <div
//               key={i}
//               className="relative bg-slate-900 border border-slate-800 rounded-2xl p-10 hover:border-cyan-500 transition"
//             >
//               <span className="absolute -top-6 left-6 text-6xl font-extrabold text-cyan-500/10">
//                 {item.step}
//               </span>
//               <h3 className="text-xl font-semibold text-cyan-400 mt-6">
//                 {item.title}
//               </h3>
//               <p className="mt-4 text-slate-400">{item.desc}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* VALUE */}
//       <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-4 gap-8">
//         {[
//           { icon: FiUsers, text: "Built for groups of any size" },
//           { icon: FiTrendingUp, text: "Always accurate calculations" },
//           { icon: FiShield, text: "Secure & private data" },
//           { icon: FiSmartphone, text: "Perfect on mobile devices" },
//         ].map((item, i) => (
//           <div
//             key={i}
//             className="bg-slate-900/60 backdrop-blur border border-slate-800 rounded-2xl p-6 text-center hover:border-cyan-500 hover:scale-105 transition"
//           >
//             <item.icon className="mx-auto text-cyan-400 text-3xl mb-4" />
//             <p className="text-slate-300">{item.text}</p>
//           </div>
//         ))}
//       </section>

//       {/* FINAL CTA */}
//       <section className="py-32 text-center">
//         <h2 className="text-4xl md:text-5xl font-extrabold">
//           Built to <span className="text-cyan-400">protect friendships</span>
//         </h2>
//         <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
//           No confusion. No awkward talks. Just smooth expense management for every group.
//         </p>

//         <div className="mt-10 flex justify-center gap-6">
//           <a
//             href="/register"
//             className="px-10 py-4 rounded-2xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 hover:scale-105 transition"
//           >
//             Start Free
//           </a>
//           <span className="flex items-center gap-2 text-slate-400">
//             <FiCheckCircle className="text-cyan-400" />
//             No credit card required
//           </span>
//         </div>
//       </section>

//       {/* FOOTER (PREMIUM) */}
//       <footer className="border-t border-slate-800 py-12">
//         <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 text-center md:text-left">
//           <div>
//             <h3 className="text-xl font-bold text-cyan-400">
//               Muhammad Javid Pasha
//             </h3>
//             <p className="mt-3 text-slate-400 max-w-md">
//               Full-Stack Developer focused on building clean, scalable,
//               and user-friendly web applications.
//             </p>
//           </div>

//           <div>
//             <p className="text-slate-300 font-semibold mb-4">
//               Connect with me
//             </p>
//             <div className="flex justify-center md:justify-start gap-6 text-2xl">
//               <a href="https://linkedin.com/in/muhammad-javid-pasha-b524881b6/" target="_blank" className="hover:text-cyan-400 hover:scale-125 transition"><FaLinkedin /></a>
//               <a href="https://instagram.com/javeed_salafi" target="_blank" className="hover:text-pink-400 hover:scale-125 transition"><FaInstagram /></a>
//               <a href="https://github.com/muhammadjavid4" target="_blank" className="hover:text-white hover:scale-125 transition"><FaGithub /></a>
//               <a href="https://x.com/gadget_bhayya_0" target="_blank" className="hover:text-cyan-300 hover:scale-125 transition"><FaXTwitter /></a>
//               <a href="https://leetcode.com/muhammad_javid_pasha/" target="_blank" className="hover:text-yellow-400 hover:scale-125 transition"><SiLeetcode /></a>
//               <a href="mailto:muhammadjavid622@gmail.com" className="hover:text-red-400 hover:scale-125 transition"><FaEnvelope /></a>
//             </div>
//           </div>
//         </div>

//         <p className="mt-10 text-center text-slate-500 text-sm">
//           © {new Date().getFullYear()} SplitWise. Crafted with care.
//         </p>
//       </footer>
//     </>
//   );
// }

import Navbar from "../components/layout/Navbar";
import {
  FiUsers,
  FiTrendingUp,
  FiShield,
  FiSmartphone,
  FiCheckCircle,
} from "react-icons/fi";
import {
  FaLinkedin,
  FaInstagram,
  FaGithub,
  FaXTwitter,
  FaEnvelope,
} from "react-icons/fa6";
import { SiLeetcode } from "react-icons/si";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

/* ---------- Animation Variants ---------- */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const fade = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const stagger = {
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

export default function Landing() {
  return (
    <>
      {/* GLOBAL BACKGROUND */}
      <div className="fixed inset-0 -z-10 bg-slate-950 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
          className="absolute top-[-300px] left-[-300px] w-[600px] h-[600px] bg-cyan-500/10 blur-3xl rounded-full animate-pulse"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute bottom-[-300px] right-[-300px] w-[600px] h-[600px] bg-indigo-500/10 blur-3xl rounded-full animate-pulse"
        />
      </div>

      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6 py-32 text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-6xl font-extrabold leading-tight"
          >
            Split expenses. <br />
            <span className="text-cyan-400">Not friendships.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto"
          >
            Track shared expenses, remove confusion, and keep friendships stress-free —
            whether it’s trips, rent, food, or daily spending.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="mt-10 flex justify-center gap-4"
          >
            <Link
              to="/register"
              className="px-8 py-3 rounded-xl bg-cyan-500 text-black font-semibold hover:bg-cyan-400 hover:scale-105 transition"
            >
              Get Started Free
            </Link>
            <Link
              to="/login"
              className="px-8 py-3 rounded-xl border border-slate-700 text-white hover:bg-slate-800 transition"
            >
              Login
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* IMAGE BREAK */}
      <motion.section
        className="max-w-6xl mx-auto px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
          alt="group"
          className="rounded-3xl shadow-lg opacity-90 hover:opacity-100 transition"
        />
      </motion.section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-3 gap-8">
        {[
          { title: "Group Expenses", desc: "Create groups and track shared expenses effortlessly." },
          { title: "Instant Balances", desc: "Know exactly who owes whom, anytime, anywhere." },
          { title: "Easy Settlements", desc: "Settle balances quickly with minimum transactions." },
        ].map((item, i) => (
          <motion.div
            key={i}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-cyan-500 hover:-translate-y-2 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold text-cyan-400">{item.title}</h3>
            <p className="mt-4 text-slate-400">{item.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* TRUST COPY */}
      <motion.section
        className="max-w-4xl mx-auto px-6 py-12 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fade}
      >
        <p className="text-slate-400 text-lg leading-relaxed">
          Designed for real-life groups — roommates, friends, trips, families, and teams.
          SplitWise keeps everything transparent so money never becomes the reason for awkward moments.
        </p>
      </motion.section>

      {/* HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.h2
          className="text-4xl font-bold text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
        >
          How <span className="text-cyan-400">SplitWise</span> Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { step: "01", title: "Create a Group", desc: "Add friends, roommates, or travel buddies in seconds." },
            { step: "02", title: "Add Expenses", desc: "Log expenses once — we handle all calculations." },
            { step: "03", title: "Settle Up", desc: "Clear balances easily with zero confusion." },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative bg-slate-900 border border-slate-800 rounded-2xl p-10 hover:border-cyan-500 transition"
            >
              <span className="absolute -top-6 left-6 text-6xl font-extrabold text-cyan-500/10">
                {item.step}
              </span>
              <h3 className="text-xl font-semibold text-cyan-400 mt-6">
                {item.title}
              </h3>
              <p className="mt-4 text-slate-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <motion.section
        className="py-32 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
      >
        <h2 className="text-4xl md:text-5xl font-extrabold">
          Built to <span className="text-cyan-400">protect friendships</span>
        </h2>
        <p className="mt-6 text-slate-400 max-w-2xl mx-auto">
          No confusion. No awkward talks. Just smooth expense management for every group.
        </p>

        <motion.div
          className="mt-10 flex justify-center gap-6"
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
        >
          <Link
            to="/register"
            className="px-10 py-4 rounded-2xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 hover:scale-105 transition"
          >
            Start Free
          </Link>
          <span className="flex items-center gap-2 text-slate-400">
            <FiCheckCircle className="text-cyan-400" />
            No credit card required
          </span>
        </motion.div>
      </motion.section>

      {/* FOOTER */}
      <motion.footer
        className="border-t border-slate-800 py-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fade}
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-10 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold text-cyan-400">
              Muhammad Javid Pasha
            </h3>
            <p className="mt-3 text-slate-400 max-w-md">
              Full-Stack Developer focused on building clean, scalable,
              and user-friendly web applications.
            </p>
          </div>

          <div>
            <p className="text-slate-300 font-semibold mb-4">
              Connect with me
            </p>
            <div className="flex justify-center md:justify-start gap-6 text-2xl">
              <a href="https://linkedin.com/in/muhammad-javid-pasha-b524881b6/" target="_blank" className="hover:text-cyan-400 hover:scale-125 transition"><FaLinkedin /></a>
              <a href="https://instagram.com/javeed_salafi" target="_blank" className="hover:text-pink-400 hover:scale-125 transition"><FaInstagram /></a>
              <a href="https://github.com/muhammadjavid4" target="_blank" className="hover:text-white hover:scale-125 transition"><FaGithub /></a>
              <a href="https://x.com/gadget_bhayya_0" target="_blank" className="hover:text-cyan-300 hover:scale-125 transition"><FaXTwitter /></a>
              <a href="https://leetcode.com/muhammad_javid_pasha/" target="_blank" className="hover:text-yellow-400 hover:scale-125 transition"><SiLeetcode /></a>
              <a href="mailto:muhammadjavid622@gmail.com" className="hover:text-red-400 hover:scale-125 transition"><FaEnvelope /></a>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} SplitWise. Crafted with care.
        </p>
      </motion.footer>
    </>
  );
}

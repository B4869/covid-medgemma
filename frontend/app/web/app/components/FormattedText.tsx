import type React from "react"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

interface FormattedTextProps {
    text: string
    className?: string
}

export const FormattedText: React.FC<FormattedTextProps> = ({ text, className }) => {
    return (
        <div
            className={`w-full prose prose-slate max-w-none dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 ${className || ""}`}
        >
            {/* class 'prose' คือหัวใจหลักของ @tailwindcss/typography 
        prose-slate: เลือกโทนสี
        max-w-none: ให้ข้อความเต็มความกว้าง container ไม่บีบตรงกลาง
        dark:prose-invert: จัดการสี text สำหรับ Dark mode อัตโนมัติ
      */}
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // จัดการ Code Block (\`\`\`language) และ Inline Code (`code`)
                    code({ node, inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || "")
                        const language = match ? match[1] : ""

                        // กรณีเป็น Code Block (มี \`\`\`)
                        if (!inline && match) {
                            return (
                                <div className="not-prose my-4 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-[#1e1e1e]">
                                    {/* Header ของ Code Block (แถบด้านบน) */}
                                    <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-gray-700">
                                        <span className="text-xs font-medium text-gray-200 lowercase">{language}</span>
                                        {/* ปุ่ม Copy (Demo layout) */}
                                        <div className="flex items-center gap-1 cursor-pointer hover:text-white text-gray-400 text-xs">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-3.5 w-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                />
                                            </svg>
                                            <span>Copy code</span>
                                        </div>
                                    </div>

                                    {/* เนื้อหา Code */}
                                    <SyntaxHighlighter
                                        style={vscDarkPlus}
                                        language={language}
                                        PreTag="div"
                                        customStyle={{
                                            margin: 0,
                                            padding: "1rem",
                                            background: "transparent", // ให้ใช้ background ของ tailwind แทน
                                            fontSize: "0.875rem", // text-sm
                                        }}
                                        {...props}
                                    >
                                        {String(children).replace(/\n$/, "")}
                                    </SyntaxHighlighter>
                                </div>
                            )
                        }

                        // กรณีเป็น Inline Code (เช่น `const a = 1`)
                        return (
                            <code
                                className="bg-gray-100 dark:bg-gray-800 text-red-500 dark:text-red-400 rounded px-1.5 py-0.5 font-mono text-sm font-semibold"
                                {...props}
                            >
                                {children}
                            </code>
                        )
                    },
                    ul({ children }) {
                        return <ul className="my-[-16px] ml-6 list-disc text-gray-700">{children}</ul>
                    },
                    ol({ children }) {
                        return <ol className="my-[-16px] ml-6 list-decimal text-gray-700">{children}</ol>
                    },
                    li({ children }) {
                        return <li className="leading-relaxed pl-1.5">{children}</li>
                    },
                    // ปรับแต่ง Table ให้ดูดีขึ้นด้วย Tailwind
                    table({ children }) {
                        return (
                            <div className="overflow-x-auto my-6 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">{children}</table>
                            </div>
                        )
                    },
                    thead({ children }) {
                        return <thead className="bg-gray-50 dark:bg-gray-800">{children}</thead>
                    },
                    th({ children }) {
                        return <th className="px-4 py-3 text-left font-semibold text-gray-900 dark:text-gray-100">{children}</th>
                    },
                    td({ children }) {
                        return (
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700 dark:text-gray-300 border-t border-gray-100 dark:border-gray-800">
                                {children}
                            </td>
                        )
                    },
                    // ปรับแต่ง Link
                    a({ href, children }) {
                        return (
                            <a
                                href={href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                            >
                                {children}
                            </a>
                        )
                    },
                }}
            >
                {text}
            </ReactMarkdown>
        </div>
    )
}

export default FormattedText

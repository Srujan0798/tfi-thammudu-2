export default function LegalLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-3xl mx-auto p-6 pb-24">
            <div className="prose prose-invert prose-yellow max-w-none">
                {children}
            </div>
        </div>
    );
}

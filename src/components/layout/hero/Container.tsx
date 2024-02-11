interface HeroProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
}

export function HeroContainer({ children, ...props }: HeroProps) {
	return (
		<section
			className={'flex min-h-[calc(100svh-76px)] flex-col justify-center gap-7 py-5'}
			{...props}
		>
			{children}
		</section>
	);
}

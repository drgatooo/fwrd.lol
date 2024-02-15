export function HeroTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h1 className={'-z-10 text-center sm:text-6xl'} {...props}>
			{children}
		</h1>
	);
}

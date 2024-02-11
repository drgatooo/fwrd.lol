export function HeroTitle({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
	return (
		<h1 className={'text-center sm:text-6xl'} {...props}>
			{children}
		</h1>
	);
}

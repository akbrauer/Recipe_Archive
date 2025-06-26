import Button, { LinkButton } from "./ui/Button";
// import RecipeListSkeleton from "./Skeletons/RecipeListSkeleton";
const func = () => {
	return (
		<div className="bg-background text-text">
			<div className="h-100 sm:h-150 lg:h-screen xl:bg-[url(/background-crop.png)] bg-[url(/background-crop-tall.png)] bg-cover md:bg-cover bg-center bg-no-repeat flex flex-col justify-center position-absolute">
			<div className="bg-opacity h-full flex items-center">
				<div className="text-center text-white max-w-5xl mx-auto px-4">
					<h2 className="text-5xl opacity-100 md:text-6xl font-bold mb-6">Welcome to The Recipe Archive</h2>
					<p className="text-xl md:text-2xl mb-8 text-white/90">Discover, save, and share your favorite recipes from around the world!</p>
					<div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-5">
						<div className="relative flex-1">
							<input className="absolute left-3 top-1/2 transform -translate-y-1/2 text-recipe-text/60 h-5 w-5" />
							<input placeholder="Search recipes..." className="pl-10 bg-white/90 border-white/20 text-recipe-text placeholder:text-recipe-text/60" />
						</div>
						<Button text="Search" customClass="bg-secondary hover:bg-recipe-secondary/90 text-white px-8"/>
					</div>
					<p className="text-xl md:text-2xl mb-4 text-white/90">Or visit the full archive!</p>
					<LinkButton text="All Recipes" customClass="mt-4 bg-primary" href="/recipes"/>
				</div>
			</div>
				
			</div>
			<div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fuga optio ex, et quisquam laboriosam eius natus totam illo inventore quibusdam animi iure vero. Nesciunt, eum. Odio ipsum reprehenderit deserunt debitis.
		Minus earum quisquam voluptatum dolorem quod soluta cumque in a laborum alias? Soluta asperiores laborum omnis, voluptas nihil obcaecati explicabo aut minus aperiam numquam corporis eligendi vero ut reprehenderit excepturi.
		Animi accusamus dignissimos dolores eius facere aspernatur veritatis eos itaque illo? Facilis quos perferendis animi! Illum, eveniet. Veniam tenetur odio quidem, est accusamus perferendis excepturi deleniti eius doloribus aspernatur fuga.
		Provident consequatur, similique cupiditate veniam praesentium quae hic perferendis minima exercitationem pariatur accusantium officia culpa illum sed id ut minus dignissimos dolore recusandae aliquam quod dolorem? Ullam doloribus eligendi beatae?
		Error a et odio animi maxime sint. Rem optio facere alias esse delectus consequuntur. Ullam perferendis blanditiis aliquam eos molestiae, odit voluptas, suscipit, magnam cumque aspernatur sunt nesciunt sequi id?
		Repudiandae facere suscipit magni a quia harum, quae officiis culpa voluptatem architecto voluptatum consectetur velit odit. Cum incidunt repellat error accusamus harum dolor dicta laborum nemo ipsum, ad nobis placeat?
		Repellendus maiores dolorem dicta. Quae hic dicta, sed et libero odit exercitationem dolorem minima iusto modi aspernatur sequi, tenetur a temporibus, veritatis molestias recusandae laborum laboriosam optio earum excepturi dolore!
		Quasi voluptates cupiditate commodi nam nesciunt delectus excepturi. Voluptatibus labore explicabo reprehenderit, voluptas veniam mollitia consequatur molestias tempore veritatis, ipsa ut? Doloremque, reiciendis at neque odit ut sequi quia architecto?
		Commodi nesciunt qui ipsum deleniti nostrum quo in sequi! Cum illum minus vel fuga expedita consequuntur nulla placeat ipsum hic sed non in consectetur, molestias totam vero error, repellendus accusamus!
		Asperiores suscipit ullam aut dignissimos officia voluptatibus rem beatae, quia consectetur omnis accusamus facere laborum eligendi distinctio sed harum fugit repellat vel voluptas blanditiis ratione molestiae commodi dolorum dolore? Laboriosam!</div>
		</div>
		
	);
};

export default func;

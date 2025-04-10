// export const initTestDB = `CREATE TABLE IF NOT EXISTS playing_with_neon(
//     id SERIAL PRIMARY KEY,
//     name TEXT NOT NULL,
//     value REAL
//     );

//     INSERT INTO playing_with_neon(name, value)
//         SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);
//     SELECT * FROM playing_with_neon;`

// export const deleteTestDB = `DROP TABLE playing_with_neon`;

export const deleteRecipeDB = `DROP TABLE Recipe`;

// export const test = `SELECT * FROM playing_with_neon`;

// export const initTablesFluid = `CREATE TABLE IF NOT EXISTS Recipe(
//     RecipeId SERIAL PRIMARY KEY,
//     Name varchar(255),
//     Image varchar(255),
//     Servings int,
//     Url varchar(255),
//     Instructions varchar(500)[]
//     );
    
//     CREATE TABLE Ingredient(
//     IngredientId SERIAL PRIMARY KEY,
//     Amount varchar(255),
//     Unit varchar(255),
//     Name varchar(255),
//     Notes varchar(255),
//     RecipeId int,
//     CONSTRAINT FK_RecipeId FOREIGN KEY (RecipeId) REFERENCES Recipe(RecipeId)
//     );`;

export const initTables = `CREATE TABLE IF NOT EXISTS Recipe(
    RecipeId uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    Name varchar(255) NOT NULL,
    Image varchar(255) DEFAULT NULL,
    Servings int DEFAULT NULL,
    Url varchar(255) NOT NULL,
    Instructions varchar(500)[]
    );
    
    CREATE TABLE Ingredient(
    IngredientId uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    Amount varchar(255) DEFAULT NULL,
    Unit varchar(255) DEFAULT NULL,
    Name varchar(255) NOT NULL,
    Notes varchar(255) DEFAULT NULL,
    RecipeId uuid NOT NULL,
    Index int NOT NULL,
    CONSTRAINT FK_RecipeId FOREIGN KEY (RecipeId) REFERENCES Recipe(RecipeId)
    );`;

export const firstRecipe = `INSERT INTO Recipe(Name, Image, Servings, Url, Instructions)
    VALUES (
    'Saucy Moroccan-Spiced Lentils',
    'https://minimalistbaker.com/wp-content/uploads/2017/11/Moroccan-Lentils-SQUARE.jpg',
    '6',
    'https://minimalistbaker.com/saucy-moroccan-spiced-lentils/',
    '{
        "Cook lentils first by bringing water to a boil and adding lentils. Bring back to a boil. Then reduce heat to low and simmer (uncovered) for about 20 minutes or until lentils are tender.",
		"In the meantime, to a food processor or small blender, add garlic*, onion or shallot*, bell pepper, tomato paste, coconut sugar, sea salt, paprika, cumin, coriander, ginger, turmeric, cayenne pepper, and apple cider vinegar. Mix to thoroughly combine.",
		"Taste and adjust flavor as needed, adding more tomato paste for depth of flavor, spices for more overall flavor (especially coriander and paprika), cayenne for heat, coconut sugar for sweetness, apple cider vinegar for acidity, or salt for saltiness. Set aside.",
		"Once the lentils have cooked, drain off any excess liquid and then add spice mixture and parsley or cilantro and mix well to combine (see photo).",
		"Enjoy immediately with salads, rice (or cauliflower rice), bowls, and more. Store leftovers in the refrigerator up to 4-5 days or in the freezer up to 1 month."
    }'
    )`;

export const firstIngredients = `INSERT INTO Ingredient(Amount, Unit, Name, Notes, RecipeId, Index)
    VALUES (
        '2',
        'cups',
        'water',
        '',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '1'
    ),
    (
        '1',
        'cup',
        'green lentils',
        '(rinsed and well drained // or sub canned lentils lightly rinsed and well drained)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '2'
    ),
    (
        '3',
        'cloves',
        'garlic*',
        '(skins removed)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '3'
    ),
    (
        '1/2',
        'medium',
        'onion',
        '(or 2 small shallots // chopped)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '4'
    ),
    (
        '1',
        'large',
        'red bell pepper',
        '(or use 2 small), seeds removed, roughly chopped',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '5'
    ),
    (
        '2',
        'Tbsp',
        'tomato paste',
        '',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '6'
    ),
    (
        '1 1/2',
        'Tbsp',
        'coconut sugar or maple syrup',
        '(or stevia to taste)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '7'
    ),
    (
        '1/2',
        'tsp',
        'sea salt',
        '(plus more to taste)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '8'
    ),
    (
        '1',
        'Tbsp',
        'smoked or sweet paprika',
        '(plus more to taste)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '9'
    ),
    (
        '1',
        'tsp',
        'ground cumin',
        '(plus more to taste)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '10'
    ),
    (
        '1/2',
        'tsp',
        'ground coriander',
        '(plus more to taste)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '11'
    ),
    (
        '1',
        'tsp',
        'ground ginger',
        '(plus more to taste)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '12'
    ),
    (
        '1/2',
        'tsp',
        'ground turmeric',
        '(plus more to taste)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '13'
    ),
    (
        '1/2',
        'tsp',
        'cayenne pepper',
        '(more or less to preferred spice level)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '14'
    ),
    (
        '1 1/2',
        'Tbsp',
        'apple cider vinegar',
        '(or lemon juice)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '15'
    ),
    (
        '3/4',
        'cup',
        'fresh chopped parsley or cilantro',
        '(I used 1/2 cilantro + 1/2 parsley)',
        '7bfe5317-835e-4f80-96ce-f713f9138faf',
        '16'
    )`
    
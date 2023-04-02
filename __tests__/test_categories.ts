import { getCategories,getPostsByCat } from "../services"

test(
    'CategoriesProps are fetched', async() =>{
        const categories = await getCategories();
        expect(categories).toContainEqual({name :'Sculpture',slug:'sculpture'})
    }
)

test (
    'Posts are fetched',async() =>{
        const posts = await getPostsByCat("realistic");
        expect(posts[0].node.categories).toContainEqual({"name": "Realistic", "slug": "realistic"});
    }
)

import RecipeFull from "./RecipeFull";

function Show(){
    const id = "55";
    return (
        <div className="mx-20">
            <h1 className='text-center'>Specific Recipe Page</h1>
            <RecipeFull id={id}/>
        </div>
    )
}

export default Show;
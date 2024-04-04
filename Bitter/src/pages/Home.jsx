import { useParams } from "react-router-dom";

const Home = () => {

    const { user } = useParams();
    console.log(user);


    return(
        <>
            <div>Home</div>
        </>
    )
}

export default Home

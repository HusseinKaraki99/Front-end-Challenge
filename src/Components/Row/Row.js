import "./Row.css"

const Row = ({ name, description, stars, issues, username, avatar, startDate }) => {



    const diffInDays = (date) => {
        const repDate = new Date(date);
        const today = new Date();
        const diffTime = Math.abs(today - repDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    }

    return <>

        <div className="row-container">
            <img src={avatar} alt="" />
            <div className="details">
                <h1 className="name">{name}</h1>
                <div className="description"><p>{description}</p></div>
                <div className="inDetails">
                    <div className="stars">stars: {stars}</div>
                    <div className="issues">issues: {issues}</div>
                    <div className="time-interval">submitted {diffInDays(startDate)} days ago by {username}</div>
                </div>
            </div>

        </div>


    </>
}

export default Row;
import React, {useState} from "react";

function Apod() {
    const [date, setDate] = useState('');
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(false);

    const API_BASE = import.meta.env.VITE_API_BASE_URL;

    const submit = async(e) => {
        e.preventDefault();

        if (new Date(date) > new Date()) {
            alert("The selected date cannot be in the future. Please choose a valid date.");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/apod?date=${date}`);
            
            if(res.ok){
                const data = await res.json();
                setApod(data);
            }else{
                const data = await res.json();
                console.log("Error fetching backend", data);
            }
        } catch (error) {
            console.error(error);
        }finally{
            setLoading(false);
        }
    };

    return(
        <div>
            <h1>Astronomy Picture of the Day</h1>
            <form onSubmit={submit}>
                <input
                type="date"
                id="date-picker"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                />
                <button disabled={loading} type="submit">
                    {loading ? "Loading..." : "Display APOD"}
                </button>
            </form>

            {apod && (
                <div style={{marginTop:"20px"}} id="con">
                    <h2>{apod.title} ({apod.date})</h2>
                    {apod.media_type === "image" ? (
                        <img src={apod.hdurl || apod.url} alt={apod.title} style={{ maxWidth:'100%' }}/>
                    ) : apod.media_type === "video" ? (
                        <iframe src={apod.url} title={apod.title} style={{ width:'95%', minHeight:'450px'}} allowFullScreen></iframe>
                    ) : <h3>{apod.url ? 
                    `See video at ${apod.url}` : 
                    "No media provided!"}
                        </h3>
                    }

                    <p>{apod.explanation}</p>

                </div>
            )}
        </div>
    )
}

export default Apod
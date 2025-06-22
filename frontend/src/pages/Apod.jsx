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
                        <img src={apod.url} alt={apod.title} style={{ maxWidth:'100%' }}/>
                    ) : (
                        <iframe src={apod.url} title="apod video" style={{ width:'100%' , height:'500px'}}></iframe>
                    )}

                    <p>{apod.explanation}</p>

                </div>
            )}
        </div>
    )
}

export default Apod
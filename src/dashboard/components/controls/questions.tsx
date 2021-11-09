import React, { useEffect, useState } from "react"

const Questions: React.FC<any> = (props) => {

    const [loading, setLoading] = useState(false);
    const [questionResults, setQuestionResults] = useState<any>();



    useEffect(() => {
        async function start() {
            var token = "";
            if (window.electron) {
                token = await window.electron.sendMessageApi.getToken();
            }

            fetch(`https://peetsunbae.com/dashboard/question/get?subject=${props.subject}&page=${props.page}`, {
                method: "GET",
                headers: { "Authorization": token },
                credentials: "include"
            }).then((response) => {
                setLoading(false);
                response.json()
                    .then((result) => {
                        console.log(result);
                        setQuestionResults(result.message);
                    })
            }).catch((error) => {
                console.log(error);
            })
        }
        start();

    }, [props.subject, props.page]);

    return (
        <div>
            1
        </div>
    )
}

export default Questions;
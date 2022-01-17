import React from 'react';
import styles from '../../componentsStyle/attendance.module.css'

const Mobile: React.FC<any> = (props) => {

    const connect = async (e : any, where : string) => {

        
        var token = "";
        if (window.electron) {
            token = await window.electron.sendMessageApi.getToken();
        }

        fetch(`http://localhost:3003?where=${where}`, {
            method: "GET",
            headers: { "Authorization": token },
        }).then((response: any) => {
            response.json()
                .then((result: any) => {
                    console.log(result);
                })
        })
    }

    return (
        <div>
            <div className={styles.board}>
                <div className={styles.phoneBoard} onClick={(e)=>{connect(e, "six")}}>
                    <div className={styles.phoneImage}>
                        <img className={styles.phone} src="img/mobile-duotone.svg" alt="phone" />
                    </div>
                    <div className={styles.phoneTitle}>
                        6층폰
                    </div>
                </div>
                <div className={styles.phoneBoard} onClick={(e)=>{connect(e, "four")}}>
                    <div className={styles.phoneImage}>
                        <img className={styles.phone} src="img/mobile-duotone.svg" alt="phone" />
                    </div>
                    <div className={styles.phoneTitle}>
                        4층폰
                    </div>

                </div>
                <div className={styles.phoneBoard} onClick={(e)=>{connect(e, "second")}}>
                    <div className={styles.phoneImage}>
                        <img className={styles.phone} src="img/mobile-duotone.svg" alt="phone" />
                    </div>
                    <div className={styles.phoneTitle}>
                        2호점
                    </div>
                </div>
            </div>
            <div className={styles.messageLaw}>
                <div className={styles.messageLawTitle}>
                    [메세지 전송 규정]
                </div>
                <div className={styles.messageLawText}>
                    <ul>
                        <li>메세지 보내기 전 전화는 <span className={styles.bold}>소리샘 안내</span>가 나올때까지 대기하고 받으면 잘 맞춰서 와달라는 내용 포함해서 얘기하기</li>
                        <li>
                            처음 메세지는 <span className={styles.bold}>'학생 이름/위반 내용/규정 준수 바람/답장 바람'</span>을 포함해서 보내기 - (출석에 신경을 많이 쓰고 있다는 것을 보이게 하는 것이 포인트)<br></br>
                            (ex)<br></br> 민수님 정기일정에 11시까지 등원하시기로 되있는데 아직 등원 안하셔서 연락드립니다.<br></br> 
                            등원 시간 잘 지켜주시길 바랍니다.
                            <br></br>
                            보시면 전화나 문자 바로 부탁드립니다.
                        </li>
                        <li>
                            학생이 답장오면 <span className={styles.bold}>한번 더 잘 지켜주길 당부</span>하는 식으로 답장<br></br>
                            (ex)<br></br>
                            (학생) - 늦잠 때문에 늦었어요.
                            <br></br>
                            (학원) - 민수님 다음부터는 출석 시간 꼭 잘 지켜주시길 부탁드릴게요. 있다 봬요!
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Mobile;
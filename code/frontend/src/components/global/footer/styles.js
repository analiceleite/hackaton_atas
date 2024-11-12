import styled from "styled-components";


export const BackgroundFooter = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 0vh;
    background-color: white;
    width: 100vw;
    height: 6vh;
`

export const ContentFooter = styled.div`
    &>ul{
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5vh;

        &>a{
            color: rgba(60, 55, 71, 0.5);
            text-decoration: none;

            &>span{
                color: #05A6CB;
                cursor: pointer;

                &:hover{
                    color: #20849B;
                }
            }
        }
    }
`
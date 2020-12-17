export const getDate = () => {
    let day = document.querySelector('.global-case-date');
    let today = new Date();
    let date = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    console.log(date)
    day.innerHTML = `${month}/${date}/${year}`

}
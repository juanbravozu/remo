const validateEmail = (email:string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function getInnerInputValue(container: HTMLElement, checked?:string) {
    if(checked === 'checked') {
        return '' + container.querySelector('input')![checked];
    }
    return '' + container.querySelector('input')?.value;
}

export default validateEmail;
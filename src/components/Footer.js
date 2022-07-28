export default function Footer(props){
    const date = new Date();
    let year = date.getFullYear();
    const an = year + " @eduardbede ";
    return(
            <footer style={props.colorDarkMode} className="font-mono flex justify-center gap-2">
                <div>{an}</div>
                <a href="https://github.com/eduardbede" className="underline">Visit GitHub</a>
              </footer>
    )
}
export function Inputbox({title, boxtext}){
    return (
        <>
            <div className="flex flex-col">
                <div className="font-medium text-sm text-left py-2">
                {title}
                </div>
                <input placeholder={boxtext}  className="w-full px-2 py-1"></input>
            </div>
        </>
    )
}
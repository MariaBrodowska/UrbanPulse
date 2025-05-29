function RenderHeader(props: { nazwa: string }) {
    return (<th>{props.nazwa}</th>)
}
function getTableHeaders(sample: Object) {
    const keys: string[] = Object.keys(sample)
    return keys.map((key) => {
        return <RenderHeader nazwa={key} key={"h" + key} />
    })
}
function RenderCell(props: { nazwa: string }) {
    return (<td>{props.nazwa}</td>)
}
function getTableRow(sample: Object, upperindex: number) {
    const values: any[] = Object.values(sample); 
    return values.map((val, index) => {
        const cellValue = (typeof val === 'object' || val === null) ? JSON.stringify(val) : String(val);
        return <RenderCell nazwa={cellValue} key={"" + upperindex + "" + index} />
    })
}
function RenderRow(props: { sample: Object, upperindex: number, editData: (data : Object) => void}) {
    return <tr onClick={()=> props.editData(props.sample)}>{getTableRow(props.sample, props.upperindex)}</tr>
}
export function RenderTable(props: { objects: Object[], onClick : (data : Object)=>void }) {
    if (props.objects === undefined || props.objects.length === 0) {
        return <table><tbody><tr><td><p>Loading data or no data available...</p></td></tr></tbody></table>;
    }
    return <table>
        <thead><tr>{getTableHeaders(props.objects[0])}</tr></thead>
        <tbody>{props.objects.map((obj, index) => {
            
            return <RenderRow editData={props.onClick} sample={obj} upperindex={index} key={"r" + index} />
        })}</tbody>
    </table>
}

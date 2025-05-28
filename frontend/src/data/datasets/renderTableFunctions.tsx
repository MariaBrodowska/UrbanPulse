export function RenderHeader(props: { nazwa: string }) {
    return (<th>{props.nazwa}</th>)
}
export function getTableHeaders(sample: Object) {
    const keys: string[] = Object.keys(sample)
    return keys.map((key) => {
        return <RenderHeader nazwa={key} key={"h" + key} />
    })
}
export function RenderCell(props: { nazwa: string }) {
    return (<td>{props.nazwa}</td>)
}
export function getTableRow(sample: Object, upperindex: number) {
    const values: any[] = Object.values(sample); 
    return values.map((val, index) => {
        const cellValue = (typeof val === 'object' || val === null) ? JSON.stringify(val) : String(val);
        return <RenderCell nazwa={cellValue} key={"" + upperindex + "" + index} />
    })
}
export function RenderRow(props: { sample: Object, upperindex: number }) {
    return <tr>{getTableRow(props.sample, props.upperindex)}</tr>
}
export function RenderTable(props: { objects: Object[] }) {
    if (props.objects === undefined || props.objects.length === 0) {
        return <table><tbody><tr><td><p>Loading data or no data available...</p></td></tr></tbody></table>;
    }
    return <table>
        <thead><tr>{getTableHeaders(props.objects[0])}</tr></thead>
        <tbody>{props.objects.map((obj, index) => {
            return <RenderRow sample={obj} upperindex={index} key={"r" + index} />
        })}</tbody>
    </table>
}

import './spinner.style.css'

export const Spinner = ({ width = 20 }: { width?: number }) => {
    return (
        <div className="loader" style={{ width: width, height: width }}></div>
    )
}

import './ChartActions.css';

interface ChartActionsProps {
    onGenerate: () => void;
    onClear: () => void;
    isLoading: boolean;
    hasSelectedDatasets: boolean;
    useLogarithmicScale: boolean;
    onLogarithmicScaleChange: (useLogarithmicScale: boolean) => void;
}

function ChartActions({
    onGenerate,
    onClear,
    isLoading,
    hasSelectedDatasets,
    useLogarithmicScale,
    onLogarithmicScaleChange
}: ChartActionsProps) {
    return (
        <div className="chart-actions">
            <div className="normalization-option">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        checked={useLogarithmicScale}
                        onChange={(e) => onLogarithmicScaleChange(e.target.checked)}
                        disabled={isLoading}
                    />
                    <span className="checkbox-text">Logarithmic Scale</span>
                </label>
            </div>
            
            <button 
                className="action-btn generate-btn" 
                onClick={onGenerate}
                disabled={!hasSelectedDatasets || isLoading}
            >
                {isLoading ? 'Generating...' : 'Generate Chart'}
            </button>
            <button 
                className="action-btn clear-btn" 
                onClick={onClear}
                disabled={isLoading}
            >
                Clear
            </button>
        </div>
    );
}

export default ChartActions;

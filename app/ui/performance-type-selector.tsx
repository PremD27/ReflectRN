
interface PerformanceTypeProps {
    defaultValue?: string;
}

export default function PerformanceTypeSelector({ defaultValue = 'observed' }: PerformanceTypeProps){
    return (
        <select name="procedure-performanceType" defaultValue={defaultValue}>
            <option value="independent">Independent</option>
            <option value="assisted">Assisted</option>
            <option value="observed">Observed</option>
        </select>
    );
}
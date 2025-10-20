import { usefetchData } from '../../hook/useFetchData';
import { SkillsUI } from '../ui/Skills/SkillsUI';

export function Skills() {
    const { datas, error, isLoading } = usefetchData({
        url: '/api/fetchJson?jsonFile=true&url=skills',
        jsonFile: true,
    });

    const handleClick = () => {
        console.log('CLICK SKILLS');
    };

    if (isLoading) {
        return (
            <div className="containerSkills">
                <div>Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="containerSkills">
                <div>Error loading skills.</div>
            </div>
        );
    }
    if (datas?.success) {
        const { response } = datas;
        // console.log('RESPONSE', response);
        return <SkillsUI data={response} onClick={handleClick} />;
    }
}

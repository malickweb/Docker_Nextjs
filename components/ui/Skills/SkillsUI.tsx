import './SkillsUI.css';

import { CardsRoundedUI } from '../Cards/CardsRoundedUI';

type Skill = {
    [key: string]: string | number;
}[];

type SkillsUIProps = {
    data: Skill;
    onClick?: () => void;
};

export function SkillsUI({ data, onClick }: SkillsUIProps) {
    return (
        <div className="containerSkills">
            <div className="title">Skills</div>
            <ul>
                {data.map((index, i: number) => (
                    <li key={i}>
                        <CardsRoundedUI title={index.title} id={index.id} onClick={onClick} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

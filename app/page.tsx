'use client';

import { Title } from '../components/title/title';
import { Skills } from '../components/skills/skills';
import { Slider } from '../components/slider/slider';

export default function Home() {
    return (
        <div>
            <Title />
            <Skills />
            <Slider />
        </div>
    );
}

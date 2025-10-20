'use client';

import { Title } from '../components/title/title';
import { Skills } from '../components/Skills/skills';
import { Slider } from '../components/Slider/slider';

export default function Home() {
    return (
        <div>
            <Title />
            <Skills />
            <Slider />
        </div>
    );
}

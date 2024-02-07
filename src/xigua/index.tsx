import { useEffect, useRef } from "react";
import { Engine, Render, Runner, Composite, Bodies, Events, Mouse } from 'matter-js';

function Xigua() {

    const hasCollision = useRef(false);
    let engine: Engine;


    useEffect(() => {
        engine = Engine.create();
        const render = Render.create({
            element: document.getElementById('xigua_body')!!,
            engine: engine
        });

        // const boxA = Bodies.rectangle(400, 200, 80, 80);
        // const boxB = Bodies.rectangle(450, 50, 80, 80);
        // const circleA = Bodies.circle(200, 200, 20);
        const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });   
        
        Composite.add(engine.world, []);

        // run the renderer
        Render.run(render);

        // create runner
        const runner = Runner.create();

        // run the engine
        Runner.run(runner, engine);

        Events.on(engine, "collisionActive", (event) => {
            if (!hasCollision.current) {
                console.log("collision, event: ", event);
                hasCollision.current = true;
            }
        });

        Events.on(engine, "collisionEnd", (event) => {
            console.log("collisionEnd, event: ", event);
        });

        Mouse.create(document.getElementById('xigua_body')!!);

    }, []);

    const rand = () => {
        const circleB = Bodies.circle(200, 200, 20);
        Composite.add(engine.world, [circleB]);
    }

    return (
        <div>
            <div className="flex flex-row justify-center items-center">
                <button onClick={rand}>rand</button>
            </div>
            <div id="xigua_body" className="flex flex-row w-full h-96"></div>
        </div>
    );
}

export default Xigua;

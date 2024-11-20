import type { DiceThrower, DieOptions } from "../../3d";
import { type DiceSystem, Status } from "../../core/types";
import { type DieSegment, type DxSegment, DxSegmentType, type WithDxStatus } from "./types";
import { DX } from ".";

async function roll(
    part: WithDxStatus<DxSegment, Status.PendingRoll>,
    rollOptions: RollOptions,
): Promise<WithDxStatus<DieSegment, Status.PendingEvaluation>> {
    if (part.type !== DxSegmentType.Die) {
        throw new Error(`Received a part of an unexpected type (${part.type})`);
    }

    const results = await rollOptions.thrower.throwDice(
        Array.from({ length: part.amount }, () => ({ name: part.die })),
        rollOptions.dieDefaults,
    );
    const output = results?.faceIds.map((r) => FACE_VALUE_MAPPING[part.die]?.[r]) ?? [];

    return {
        ...part,
        status: Status.PendingEvaluation,
        output,
    };
}

// The below mapping corresponds to the meshes from all_dice.babylon + uv mapping
// Currently these are still located in the main PA server folder,
// they should be moved to this lib when we move to the mod version

export enum Dice {
    D4 = "d4",
    D6 = "d6",
    D8 = "d8",
    D10 = "d10",
    D12 = "d12",
    D20 = "d20",
    D100 = "d100",
}

const FACE_VALUE_MAPPING: Record<DieSegment["die"], number[]> = {
    [Dice.D4]: [4, 3, 1, 2],
    [Dice.D6]: [6, 2, 1, 5, 3, 4, 6, 2, 1, 5, 3, 4],
    [Dice.D8]: [1, 7, 8, 2, 3, 5, 6, 4],
    [Dice.D10]: [5, 9, 1, 7, 3, 4, 10, 8, 2, 6, 5, 9, 1, 7, 3, 4, 10, 8, 2, 6],
    [Dice.D12]: [
        1, 4, 2, 5, 6, 3, 12, 9, 11, 8, 7, 10, 1, 1, 4, 4, 2, 2, 5, 5, 6, 6, 3, 3, 12, 12, 9, 9, 11, 11, 8, 8, 7, 7, 10,
        10,
    ],
    [Dice.D20]: [6, 9, 16, 3, 19, 11, 14, 8, 17, 1, 4, 20, 10, 7, 13, 18, 2, 12, 15, 5],
    [Dice.D100]: [50, 90, 10, 70, 30, 40, 100, 80, 20, 60, 50, 90, 10, 70, 30, 40, 100, 80, 20, 60],
};

interface RollOptions {
    thrower: DiceThrower;
    dieDefaults?: Partial<DieOptions>;
}

export const DX3: DiceSystem<DxSegment, RollOptions> = {
    ...DX,
    roll,
};
import { platform, arch } from "node:os";
import { readFile, access, constants } from "node:fs/promises";
import { fileURLToPath } from 'node:url';
import { resolve, dirname } from 'node:path';
const currentBin = {
    pkg: `@ffprobe-binary/${platform()}-${arch()}`,
    name: platform() === 'win32' ? 'ffprobe.exe' : 'ffprobe'
};
const getBinList = async () => {
    try {
        const json = JSON.parse(await readFile(new URL('../package.json', import.meta.url), { encoding: 'utf8' }));
        return { bool: true, list: json.optionalDependencies };
    }
    catch (err) {
        console.error('@ffprobe-binary/ffprobe: An error occurred while loading the dependency modules list.');
        console.error(err);
        return { bool: false, list: null };
    }
};
const checkBinList = (binList) => {
    if (binList === null) {
        return false;
    }
    const search = Object.entries(binList).find(item => item[0] === currentBin.pkg);
    if (typeof search !== 'undefined') {
        return true;
    }
    else {
        console.error('@ffprobe-binary/ffprobe: This module does not support the current platform or architecture.');
        return false;
    }
};
const getBinPath = async () => {
    try {
        const module = await import(currentBin.pkg);
        const path = resolve(dirname(fileURLToPath(module.default)), currentBin.name);
        return { bool: true, path: path };
    }
    catch (err) {
        console.error('@ffprobe-binary/ffprobe: An error occurred while loading the dependency module.');
        console.error(err);
        return { bool: false, path: null };
    }
};
const checkBinAccess = async (path) => {
    if (path === null) {
        return false;
    }
    try {
        await access(path, constants.R_OK);
        return true;
    }
    catch (err) {
        console.error('@ffprobe-binary/ffprobe: An error occurred while verifying the binary.');
        console.error(err);
        return false;
    }
};
async function getResult() {
    const binList = await getBinList();
    if (!binList.bool) {
        return null;
    }
    if (!checkBinList(binList.list)) {
        return null;
    }
    const binPath = await getBinPath();
    if (!binPath.bool) {
        return null;
    }
    if (!await checkBinAccess(binPath.path)) {
        return null;
    }
    return binPath.path;
}
const ffprobe = await getResult();
export default ffprobe;

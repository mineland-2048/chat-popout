import fnmatch, os, shutil, json, zipfile


print("Packing the extension...")

source_folder = "./source"
output_folder = "./archives"
ignore = [
    "*.bak",
    "*~"
]

zip_name = "chat-popup"
version = "x.x"
with(open(source_folder + "/manifest.json") as f):
    manifest = json.load(f)
    version = manifest["version"]

zip_name = "{zip_name}-{version}.zip".format(zip_name=zip_name, version=version)

print("Version: {version}".format(version=version))
print("Output file: {zip_name}".format(zip_name=zip_name))

zip_archive = zipfile.ZipFile(output_folder + "/" + zip_name, "w", zipfile.ZIP_DEFLATED)

files_packed: int = 0
files_skipped: int = 0
for root, dirs, files in os.walk(source_folder):
    for file in files:
        if any([fnmatch.fnmatch(file, pattern) for pattern in ignore]):
            files_skipped += 1
            continue


        zip_archive.write(os.path.join(root, file), os.path.relpath(os.path.join(root, file), source_folder))
        files_packed += 1


print("Files packed: {files_packed}".format(files_packed=files_packed))
print("Files skipped: {files_skipped}".format(files_skipped=files_skipped))

zip_archive.close()

print("Done.")


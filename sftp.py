import pysftp
import os
import shutil
import datetime

Hostname = "mylines.fr"
Username = "bhome"
Password = "taGrosseMaireLapute!3391"

cnopts = pysftp.CnOpts()
cnopts.hostkeys = None

print('Sauvegarde...')
print("")
print("Sauvegarde depuis MyLines.fr")
print(" Connection en cours...")
with pysftp.Connection(host=Hostname, username=Username, password=Password, port=200, cnopts=cnopts) as sftp:
    print(" Connection établie ✔️")
    # Switch to a remote directory
    sftp.cwd('/home/Backup/')
    directory_structure = sftp.listdir_attr()
    for attr in directory_structure:
        print(attr.filename)
        # sftp.cd('/mnt/disk_raid1/files/Backup/')
        # filecontent = sftp.get(f'/home/Backup/{attr.filename}', True)
        # f = open(f'/mnt/disk_raid1/files/Backup/{attr.filename}', "a")
        # f.write(filecontent)
        # f.close()

    name = datetime.datetime.now()
    
    # On télécharge l'intégralité du dossier
    os.mkdir(f'/mnt/disk_raid1/files/Backup/{name}', mode=0o777)
    print(' Récupération de la sauvegarde...')
    sftp.get_d('/home/Backup/', f'/mnt/disk_raid1/files/Backup/{name}', True)
    print(' Récupération de la sauvegarde ✔️')

    sftp.close()

print("Sauvegarde du Drive")
print(' Récupération du Drive...')
source_folder = r"/var/www/html"
destination_folder = r"/mnt/disk_raid1/files/Backup/Drive"

# fetch all files
for file_name in os.listdir(source_folder):
    # construct full file path
    source = source_folder + file_name
    destination = destination_folder + file_name
    # copy only files
    if os.path.isfile(source):
        shutil.copy(source, destination)
print(' Récupération du Drive ✔️')
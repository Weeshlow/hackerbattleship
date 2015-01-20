# System Configurations

This directory contains various system configuration files for the
hackerbattleship server. To use these files, simply copy them to /etc/<whatever>
on the server. They presume an Ubuntu based distro, so if you are not using
that, you may need to copy them to different locations on your host.

## Example installation process:

`cp init/hackerbattleship.conf /etc/init/`

`cp -R nginx* /etc/nginx/`

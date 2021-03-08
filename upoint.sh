#scp -P 18765 -r ./dist/* softblad@77.104.135.77:/home/softblad/public_html/upoint
rsync -v -e "ssh -p18765" /Users/softblade/work/php/upoint/dist/* softblad@77.104.135.77:/home/softblad/public_html/upoint

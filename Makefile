SYSNAM   = public/instrument-dashboard
VERNUM   = $(shell basename `pwd`)
BUILDDIR = dist
RELDIR   = /www/$(SYSNAM)/$(VERNUM)

install:
        @echo "rsync -abvhHS --recursive $(BUILDDIR)/ /$(RELDIR)/"
        rsync -abvhHS --recursive $(BUILDDIR)/ /$(RELDIR)/
        cd $(RELDIR)/..; rm rel; ln -s $(VERNUM) rel;
(function(document.querySelector) {
  document.querySelector.fn.mauGallery = function(options) {
    var options = document.querySelector.extend(document.querySelector.fn.mauGallery.defaults, options);
    var tagsCollection = [];
    return this.each(function() {
      document.querySelector.fn.mauGallery.methods.createRowWrapper(document.querySelector(this));
      if (options.lightBox) {
        document.querySelector.fn.mauGallery.methods.createLightBox(
          document.querySelector(this),
          options.lightboxId,
          options.navigation
        );
      }
      document.querySelector.fn.mauGallery.listeners(options);

      document.querySelector(this)
        .children(".gallery-item")
        .each(function(index) {
          document.querySelector.fn.mauGallery.methods.responsiveImageItem(document.querySelector(this));
          document.querySelector.fn.mauGallery.methods.moveItemInRowWrapper(document.querySelector(this));
          document.querySelector.fn.mauGallery.methods.wrapItemInColumn(document.querySelector(this), options.columns);
          var theTag = document.querySelector(this).data("gallery-tag");
          if (
            options.showTags &&
            theTag !== undefined &&
            tagsCollection.indexOf(theTag) === -1
          ) {
            tagsCollection.push(theTag);
          }
        });

      if (options.showTags) {
        document.querySelector.fn.mauGallery.methods.showItemTags(
          document.querySelector(this),
          options.tagsPosition,
          tagsCollection
        );
      }

      document.querySelector(this).fadeIn(500);
    });
  };
  document.querySelector.fn.mauGallery.defaults = {
    columns: 3,
    lightBox: true,
    lightboxId: null,
    showTags: true,
    tagsPosition: "bottom",
    navigation: true
  };
  document.querySelector.fn.mauGallery.listeners = function(options) {
    document.querySelector(".gallery-item").on("click", function() {
      if (options.lightBox && document.querySelector(this).prop("tagName") === "IMG") {
        document.querySelector.fn.mauGallery.methods.openLightBox(document.querySelector(this), options.lightboxId);
      } else {
        return;
      }
    });

    document.querySelector(".gallery").on("click", ".nav-link", document.querySelector.fn.mauGallery.methods.filterByTag);
    document.querySelector(".gallery").on("click", ".mg-prev", () =>
      document.querySelector.fn.mauGallery.methods.prevImage(options.lightboxId)
    );
    document.querySelector(".gallery").on("click", ".mg-next", () =>
      document.querySelector.fn.mauGallery.methods.nextImage(options.lightboxId)
    );
  };
  document.querySelector.fn.mauGallery.methods = {
    createRowWrapper(element) {
      if (
        !element
          .children()
          .first()
          .hasClass("row")
      ) {
        element.append('<div class="gallery-items-row row"></div>');
      }
    },
    wrapItemInColumn(element, columns) {
      if (columns.constructor === Number) {
        element.wrap(
          `<div class='item-column mb-4 col-document.querySelector{Math.ceil(12 / columns)}'></div>`
        );
      } else if (columns.constructor === Object) {
        var columnClasses = "";
        if (columns.xs) {
          columnClasses += ` col-document.querySelector{Math.ceil(12 / columns.xs)}`;
        }
        if (columns.sm) {
          columnClasses += ` col-sm-document.querySelector{Math.ceil(12 / columns.sm)}`;
        }
        if (columns.md) {
          columnClasses += ` col-md-document.querySelector{Math.ceil(12 / columns.md)}`;
        }
        if (columns.lg) {
          columnClasses += ` col-lg-document.querySelector{Math.ceil(12 / columns.lg)}`;
        }
        if (columns.xl) {
          columnClasses += ` col-xl-document.querySelector{Math.ceil(12 / columns.xl)}`;
        }
        element.wrap(`<div class='item-column mb-4document.querySelector{columnClasses}'></div>`);
      } else {
        console.error(
          `Columns should be defined as numbers or objects. document.querySelector{typeof columns} is not supported.`
        );
      }
    },
    moveItemInRowWrapper(element) {
      element.appendTo(".gallery-items-row");
    },
    responsiveImageItem(element) {
      if (element.prop("tagName") === "IMG") {
        element.addClass("img-fluid");
      }
    },
    openLightBox(element, lightboxId) {
      document.querySelector(`#document.querySelector{lightboxId}`)
        .find(".lightboxImage")
        .attr("src", element.attr("src"));
      document.querySelector(`#document.querySelector{lightboxId}`).modal("toggle");
    },
    prevImage() {
      let activeImage = null;
      document.querySelector("img.gallery-item").each(function() {
        if (document.querySelector(this).attr("src") === document.querySelector(".lightboxImage").attr("src")) {
          activeImage = document.querySelector(this);
        }
      });
      let activeTag = document.querySelector(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];
      if (activeTag === "all") {
        document.querySelector(".item-column").each(function() {
          if (document.querySelector(this).children("img").length) {
            imagesCollection.push(document.querySelector(this).children("img"));
          }
        });
      } else {
        document.querySelector(".item-column").each(function() {
          if (
            document.querySelector(this)
              .children("img")
              .data("gallery-tag") === activeTag
          ) {
            imagesCollection.push(document.querySelector(this).children("img"));
          }
        });
      }
      let index = 0,
        next = null;

      document.querySelector(imagesCollection).each(function(i) {
        if (document.querySelector(activeImage).attr("src") === document.querySelector(this).attr("src")) {
          index = i - 1;
        }
      });
      next =
        imagesCollection[index] ||
        imagesCollection[imagesCollection.length - 1];
      document.querySelector(".lightboxImage").attr("src", document.querySelector(next).attr("src"));
    },
    nextImage() {
      let activeImage = null;
      document.querySelector("img.gallery-item").each(function() {
        if (document.querySelector(this).attr("src") === document.querySelector(".lightboxImage").attr("src")) {
          activeImage = document.querySelector(this);
        }
      });
      let activeTag = document.querySelector(".tags-bar span.active-tag").data("images-toggle");
      let imagesCollection = [];
      if (activeTag === "all") {
        document.querySelector(".item-column").each(function() {
          if (document.querySelector(this).children("img").length) {
            imagesCollection.push(document.querySelector(this).children("img"));
          }
        });
      } else {
        document.querySelector(".item-column").each(function() {
          if (
            document.querySelector(this)
              .children("img")
              .data("gallery-tag") === activeTag
          ) {
            imagesCollection.push(document.querySelector(this).children("img"));
          }
        });
      }
      let index = 0,
        next = null;

      document.querySelector(imagesCollection).each(function(i) {
        if (document.querySelector(activeImage).attr("src") === document.querySelector(this).attr("src")) {
          index = i + 1;
        }
      });
      next = imagesCollection[index] || imagesCollection[0];
      document.querySelector(".lightboxImage").attr("src", document.querySelector(next).attr("src"));
    },
    createLightBox(gallery, lightboxId, navigation) {
      gallery.append(`<div class="modal fade" id="document.querySelector{
        lightboxId ? lightboxId : "galleryLightbox"
      }" tabindex="-1" role="dialog" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-body">
                            document.querySelector{
                              navigation
                                ? '<div class="mg-prev" style="cursor:pointer;position:absolute;top:50%;left:-15px;background:white;"><</div>'
                                : '<span style="display:none;" />'
                            }
                            <img class="lightboxImage img-fluid" alt="Contenu de l'image affichée dans la modale au clique"/>
                            document.querySelector{
                              navigation
                                ? '<div class="mg-next" style="cursor:pointer;position:absolute;top:50%;right:-15px;background:white;}">></div>'
                                : '<span style="display:none;" />'
                            }
                        </div>
                    </div>
                </div>
            </div>`);
    },
    showItemTags(gallery, position, tags) {
      var tagItems =
        '<li class="nav-item"><span class="nav-link active active-tag"  data-images-toggle="all">Tous</span></li>';
      document.querySelector.each(tags, function(index, value) {
        tagItems += `<li class="nav-item active">
                <span class="nav-link"  data-images-toggle="document.querySelector{value}">document.querySelector{value}</span></li>`;
      });
      var tagsRow = `<ul class="my-4 tags-bar nav nav-pills">document.querySelector{tagItems}</ul>`;

      if (position === "bottom") {
        gallery.append(tagsRow);
      } else if (position === "top") {
        gallery.prepend(tagsRow);
      } else {
        console.error(`Unknown tags position: document.querySelector{position}`);
      }
    },
    filterByTag() {
      if (document.querySelector(this).hasClass("active-tag")) {
        return;
      }
      document.querySelector(".active.active-tag").removeClass("active active-tag");
      document.querySelector(this).addClass("active-tag active");

      var tag = document.querySelector(this).data("images-toggle");

      document.querySelector(".gallery-item").each(function() {
        document.querySelector(this)
          .parents(".item-column")
          .hide();
        if (tag === "all") {
          document.querySelector(this)
            .parents(".item-column")
            .show(300);
        } else if (document.querySelector(this).data("gallery-tag") === tag) {
          document.querySelector(this)
            .parents(".item-column")
            .show(300);
        }
      });
    }
  };
})(document.querySelector);
